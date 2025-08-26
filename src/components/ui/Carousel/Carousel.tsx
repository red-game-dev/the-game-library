import React, { useCallback, useEffect, useState } from 'react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import AutoScroll from 'embla-carousel-auto-scroll'
import AutoHeight from 'embla-carousel-auto-height'
import ClassNames from 'embla-carousel-class-names'
import WheelGestures from 'embla-carousel-wheel-gestures'
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react'
import { Button, type ButtonVariant, type ButtonSize } from '@/components/ui/Button'
import { UI_DELAYS } from '@/lib/core/config/constants/app.constants'
import '@/styles/components/base/carousel.css'

export type CarouselProps = {
  /** Carousel content - can be React elements, strings, numbers, or arrays of any of these */
  children?: React.ReactNode | React.ReactNode[]
  /** Embla carousel options */
  options?: EmblaOptionsType
  /** Gap between slides in rem */
  slideSpacing?: number
  /** Number of slides visible at once */
  slidesPerView?: number
  /** Show navigation arrows */
  showArrows?: boolean
  /** Arrow button variant */
  arrowVariant?: ButtonVariant
  /** Arrow button size */
  arrowSize?: ButtonSize
  /** Show dot indicators */
  showDots?: boolean
  /** Dot button variant (defaults to same as arrow variant) */
  dotVariant?: ButtonVariant
  /** Dot button size (defaults to same as arrow size) */
  dotSize?: ButtonSize
  /** Enable auto-scroll */
  autoScroll?: boolean
  /** Auto-scroll interval in ms */
  autoScrollInterval?: number
  /** Items visible at once or width per item */
  itemsPerView?: number | 'auto' | { width: string }
  /** Enable snap scrolling */
  snap?: boolean
  /** Enable infinite scroll */
  infinite?: boolean
  /** Enable touch/swipe support */
  enableSwipe?: boolean
  /** Additional CSS classes */
  className?: string
  /** Carousel height */
  height?: 'auto' | 'fixed'
  /** Test ID */
  testId?: string
  /** Plugin configurations */
  plugins?: {
    autoplay?: boolean | {
      delay?: number
      jump?: boolean
      playOnInit?: boolean
      stopOnInteraction?: boolean
      stopOnMouseEnter?: boolean
      stopOnFocusIn?: boolean
    }
    autoScroll?: boolean | {
      speed?: number
      startDelay?: number
      direction?: 'forward' | 'backward'
      playOnInit?: boolean
      stopOnInteraction?: boolean
      stopOnMouseEnter?: boolean
      stopOnFocusIn?: boolean
    }
    autoHeight?: boolean | {
      active?: boolean
      destroyHeight?: string
    }
    classNames?: boolean | {
      active?: boolean
      draggable?: string
      dragging?: string
      selected?: string
      prev?: string
      next?: string
      inView?: string
    }
    wheelGestures?: boolean | {
      active?: boolean
      forceWheelAxis?: 'x' | 'y'
      target?: HTMLElement
    }
  }
}

// Hook for previous/next buttons
type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean
  nextBtnDisabled: boolean
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}

const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
    if (onButtonClick) onButtonClick(emblaApi)
  }, [emblaApi, onButtonClick])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
    if (onButtonClick) onButtonClick(emblaApi)
  }, [emblaApi, onButtonClick])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  }
}

// Hook for dot buttons
type UseDotButtonType = {
  selectedIndex: number
  scrollSnaps: number[]
  onDotButtonClick: (index: number) => void
}

const useDotButton = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return
      emblaApi.scrollTo(index)
      if (onButtonClick) onButtonClick(emblaApi)
    },
    [emblaApi, onButtonClick]
  )

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick
  }
}


const Carousel: React.FC<CarouselProps> = ({
  children,
  options,
  slideSpacing = 1,
  slidesPerView,
  showArrows = true,
  arrowVariant = 'ghost',
  arrowSize = 'sm',
  showDots = false,
  dotVariant,
  dotSize,
  autoScroll = false,
  autoScrollInterval = 5000,
  itemsPerView = 'auto',
  snap = true,
  infinite = false,
  enableSwipe = true,
  className = '',
  height = 'auto',
  testId = 'carousel',
  plugins = {}
}) => {
  // Default dot variant/size to arrow variant/size if not specified
  const finalDotVariant = dotVariant || arrowVariant;
  const finalDotSize = dotSize || arrowSize;
  // Setup plugins array
  const emblaPlugins = []
  
  // Auto-scroll as autoplay if autoScroll prop is true
  if (autoScroll && !plugins.autoplay) {
    emblaPlugins.push(Autoplay({
      delay: autoScrollInterval,
      stopOnInteraction: true,
      stopOnMouseEnter: true
    }))
  }
  
  // Autoplay plugin (overrides autoScroll if both are set)
  if (plugins.autoplay) {
    const autoplayOptions = typeof plugins.autoplay === 'boolean' 
      ? {} 
      : plugins.autoplay
    emblaPlugins.push(Autoplay({
      delay: autoplayOptions.delay || UI_DELAYS.CAROUSEL_AUTOPLAY,
      jump: autoplayOptions.jump || false,
      playOnInit: autoplayOptions.playOnInit !== false,
      stopOnInteraction: autoplayOptions.stopOnInteraction !== false,
      stopOnMouseEnter: autoplayOptions.stopOnMouseEnter !== false,
      stopOnFocusIn: autoplayOptions.stopOnFocusIn !== false
    }))
  }
  
  // AutoScroll plugin
  if (plugins.autoScroll) {
    const autoScrollOptions = typeof plugins.autoScroll === 'boolean'
      ? {}
      : plugins.autoScroll
    emblaPlugins.push(AutoScroll({
      speed: autoScrollOptions.speed || 1,
      startDelay: autoScrollOptions.startDelay || 0,
      direction: autoScrollOptions.direction || 'forward',
      playOnInit: autoScrollOptions.playOnInit !== false,
      stopOnInteraction: autoScrollOptions.stopOnInteraction !== false,
      stopOnMouseEnter: autoScrollOptions.stopOnMouseEnter !== false,
      stopOnFocusIn: autoScrollOptions.stopOnFocusIn !== false
    }))
  }
  
  // AutoHeight plugin
  if (plugins.autoHeight) {
    const autoHeightOptions = typeof plugins.autoHeight === 'boolean'
      ? {}
      : plugins.autoHeight
    emblaPlugins.push(AutoHeight({
      active: autoHeightOptions.active !== false
    }))
  }
  
  // ClassNames plugin
  if (plugins.classNames) {
    const classNamesOptions = typeof plugins.classNames === 'boolean'
      ? {}
      : plugins.classNames
    emblaPlugins.push(ClassNames({
      active: classNamesOptions.active !== false,
      draggable: classNamesOptions.draggable || 'is-draggable',
      dragging: classNamesOptions.dragging || 'is-dragging',
      inView: classNamesOptions.inView || 'is-in-view'
    }))
  }
  
  // WheelGestures plugin
  if (plugins.wheelGestures) {
    const wheelOptions = typeof plugins.wheelGestures === 'boolean'
      ? {}
      : plugins.wheelGestures
    emblaPlugins.push(WheelGestures({
      active: wheelOptions.active !== false,
      forceWheelAxis: wheelOptions.forceWheelAxis,
      target: wheelOptions.target
    }))
  }

  // Calculate slides per view
  const calculatedSlidesPerView = slidesPerView || (
    typeof itemsPerView === 'number' ? itemsPerView : 1
  );

  // Merge options with prop-based settings
  // Start with defaults, then apply options, then override with props
  const mergedOptions: EmblaOptionsType = {
    loop: infinite || false,
    dragFree: false,
    draggable: enableSwipe !== false,
    containScroll: snap && !infinite ? 'trimSnaps' : false,
    slidesToScroll: calculatedSlidesPerView > 1 ? calculatedSlidesPerView : 1,
    watchDrag: enableSwipe !== false,
    align: 'start',
    ...options, // User-provided options can override defaults
    // Explicit props always win
    ...(infinite !== undefined && { loop: infinite }),
    ...(enableSwipe !== undefined && { draggable: enableSwipe, watchDrag: enableSwipe })
  };


  const [emblaRef, emblaApi] = useEmblaCarousel(mergedOptions, emblaPlugins)

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    resetOrStop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  )

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi, onNavButtonClick)

  // Determine additional classes based on options
  const isVertical = mergedOptions?.axis === 'y';
  const isRTL = mergedOptions?.direction === 'rtl';
  const emblaClasses = [
    'embla',
    isVertical && 'embla--vertical',
    isRTL && 'embla--rtl',
    height === 'fixed' && 'embla--fixed-height',
    className
  ].filter(Boolean).join(' ');

  // Calculate slide size based on itemsPerView
  let slideSize = '100%';
  if (typeof itemsPerView === 'number') {
    slideSize = `${100 / itemsPerView}%`;
  } else if (typeof itemsPerView === 'object' && itemsPerView.width) {
    slideSize = itemsPerView.width;
  } else if (calculatedSlidesPerView > 1) {
    slideSize = `${100 / calculatedSlidesPerView}%`;
  }

  // Style with custom spacing and slide size
  const emblaStyle = {
    '--slide-spacing': `${slideSpacing}rem`,
    '--slide-size': slideSize
  } as React.CSSProperties;

  // Determine content to render
  const renderSlides = () => {
    if (!children) return null;
    
    const childArray = React.Children.toArray(children);
    return childArray.map((child, index) => {
      // If it's a primitive (string/number), wrap it in a styled container
      const isSimpleContent = typeof child === 'string' || typeof child === 'number';
      
      return (
        <div className="embla__slide" key={index}>
          {isSimpleContent ? (
            <div className="embla__slide__number">
              {child}
            </div>
          ) : (
            child
          )}
        </div>
      );
    });
  };

  return (
    <section className={emblaClasses} style={emblaStyle} data-testid={testId}>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container will-animate">
          {renderSlides()}
        </div>
      </div>

      <div className="embla__controls">
        {showArrows && (
          <div className="embla__buttons">
            <Button
              variant={arrowVariant}
              size={arrowSize}
              iconOnly
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
              className="embla__button embla__button--prev"
              aria-label="Previous slide"
            >
              <ChevronLeft />
            </Button>
            <Button
              variant={arrowVariant}
              size={arrowSize}
              iconOnly
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
              className="embla__button embla__button--next"
              aria-label="Next slide"
            >
              <ChevronRight />
            </Button>
          </div>
        )}

        {showDots && (
          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <Button
                key={index}
                variant={finalDotVariant}
                size={finalDotSize}
                iconOnly
                onClick={() => onDotButtonClick(index)}
                className={'embla__dot'.concat(
                  index === selectedIndex ? ' embla__dot--selected' : ''
                )}
                aria-label={`Go to slide ${index + 1}`}
              >
                <Circle className="embla__dot__icon" />
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Carousel