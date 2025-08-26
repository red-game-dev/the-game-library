/**
 * @fileoverview Storybook stories for Modal component
 * @module components/ui/Modal/stories
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { Modal, ModalHeader, ModalBody, ModalFooter, type ModalSize, type ModalPosition } from './Modal';
import { Button } from '../Button';
import { Input, TextArea } from '../Input';
import { Badge } from '../Badge';
import { Alert } from '../Alert';
import { Link } from '../Link';
import { useState } from 'react';
import { Check, Info, Trash2, Settings, Download, Share2, Loader2 } from 'lucide-react';
import { Card } from '../Card';

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Modal component for dialogs, alerts, and overlays.

## Features
- 📏 6 size options (xs to full)
- 📍 3 position options (center, top, bottom)
- 🎭 Custom header and footer
- 🔒 Focus trap
- ⌨️ Escape key support
- 🖱️ Click outside to close
- 📱 Responsive design
- ♿ Accessible with ARIA
- 🌙 Dark mode support
        `
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'full'],
      description: 'Size of the modal'
    },
    position: {
      control: 'select',
      options: ['center', 'top', 'bottom'],
      description: 'Position of the modal on screen'
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show close button in header'
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Close modal when clicking overlay'
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close modal when pressing ESC key'
    },
    showOverlay: {
      control: 'boolean',
      description: 'Show background overlay'
    },
    preventScroll: {
      control: 'boolean',
      description: 'Prevent body scroll when modal is open'
    },
    persistent: {
      control: 'boolean',
      description: 'Modal stays open even when close is attempted'
    },
    validationType: {
      control: 'select',
      options: ['error', 'warning', 'info', 'persistent'],
      description: 'Type of validation behavior'
    },
    classNames: {
      control: 'object',
      description: 'Custom CSS classes for nested elements (overlay, container, content, header, body, footer)'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default modal
 */
export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Default Modal"
          description="This is a default modal with standard settings"
        >
          <p>Modal content goes here. You can add any content you want.</p>
        </Modal>
      </>
    );
  }
};

/**
 * Modal sizes
 */
export const Sizes: Story = {
  render: () => {
    const [openModal, setOpenModal] = useState<string | null>(null);
    
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const;
    
    return (
      <div className="flex flex-wrap gap-3">
        {sizes.map(size => (
          <Button
            key={size}
            onClick={() => setOpenModal(size)}
            variant="outline"
          >
            Open {size.toUpperCase()}
          </Button>
        ))}
        
        {sizes.map(size => (
          <Modal
            key={size}
            isOpen={openModal === size}
            onClose={() => setOpenModal(null)}
            title={`${size.toUpperCase()} Modal`}
            description={`This is a ${size} sized modal`}
            size={size}
          >
            <p className="mb-4 text-text">
              This modal is using the <Badge variant="primary">{size}</Badge> size.
            </p>
            <p className="text-sm text-secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua.
            </p>
          </Modal>
        ))}
      </div>
    );
  }
};

/**
 * Modal positions
 */
export const Positions: Story = {
  render: () => {
    const [openModal, setOpenModal] = useState<string | null>(null);
    
    const positions = ['center', 'top', 'bottom'] as const;
    
    return (
      <div className="flex gap-3">
        {positions.map(position => (
          <Button
            key={position}
            onClick={() => setOpenModal(position)}
            variant="secondary"
          >
            {position.charAt(0).toUpperCase() + position.slice(1)} Position
          </Button>
        ))}
        
        {positions.map(position => (
          <Modal
            key={position}
            isOpen={openModal === position}
            onClose={() => setOpenModal(null)}
            title={`${position.charAt(0).toUpperCase() + position.slice(1)} Positioned Modal`}
            description={`This modal appears at the ${position} of the screen`}
            position={position}
          >
            <p>This modal is positioned at the <strong>{position}</strong> of the viewport.</p>
          </Modal>
        ))}
      </div>
    );
  }
};

/**
 * With footer actions
 */
export const WithFooter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal with Footer</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Confirm Action"
          description="Are you sure you want to proceed with this action?"
          footer={
            <>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Confirm
              </Button>
            </>
          }
        >
          <Alert variant="warning">
            This action cannot be undone. Once you confirm, the changes will be permanent.
          </Alert>
        </Modal>
      </>
    );
  }
};

/**
 * Form modal
 */
export const FormModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Form Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Create New Game"
          description="Fill in the details to add a new game to your library"
          size="lg"
          footer={
            <>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Create Game
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <Input label="Game Title" placeholder="Enter game title" />
            <Input label="Developer" placeholder="Enter developer name" />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Genre" placeholder="Select genre" />
              <Input label="Release Year" placeholder="2024" type="number" />
            </div>
            <TextArea 
              label="Description"
              rows={4}
              placeholder="Enter game description..."
              className="w-full"
            />
          </div>
        </Modal>
      </>
    );
  }
};

/**
 * Alert modals
 */
export const AlertModals: Story = {
  render: () => {
    const [openModal, setOpenModal] = useState<string | null>(null);
    
    return (
      <div className="flex gap-3">
        <Button variant="error" onClick={() => setOpenModal('delete')}>
          Delete Alert
        </Button>
        <Button variant="warning" onClick={() => setOpenModal('warning')}>
          Warning Alert
        </Button>
        <Button variant="success" onClick={() => setOpenModal('success')}>
          Success Alert
        </Button>
        
        {/* Delete Alert */}
        <Modal
          isOpen={openModal === 'delete'}
          onClose={() => setOpenModal(null)}
          title="Delete Item"
          size="sm"
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpenModal(null)}>
                Cancel
              </Button>
              <Button variant="error" leftIcon={<Trash2 className="w-4 h-4" />} onClick={() => setOpenModal(null)}>
                Delete
              </Button>
            </>
          }
        >
          <Alert variant="error" icon={<Trash2 className="alert-icon" />}>
            Are you sure you want to delete this item? This action cannot be undone.
          </Alert>
        </Modal>
        
        {/* Warning Alert */}
        <Modal
          isOpen={openModal === 'warning'}
          onClose={() => setOpenModal(null)}
          title="Warning"
          size="sm"
          footer={
            <Button variant="warning" onClick={() => setOpenModal(null)}>
              I Understand
            </Button>
          }
        >
          <Alert variant="warning">
            Your session is about to expire. Please save your work to avoid losing any changes.
          </Alert>
        </Modal>
        
        {/* Success Alert */}
        <Modal
          isOpen={openModal === 'success'}
          onClose={() => setOpenModal(null)}
          title="Success!"
          size="sm"
          footer={
            <Button variant="success" onClick={() => setOpenModal(null)}>
              Continue
            </Button>
          }
        >
          <Alert variant="success" icon={<Check className="alert-icon" />}>
            Operation completed successfully. Your changes have been saved.
          </Alert>
        </Modal>
      </div>
    );
  }
};

/**
 * Custom content modal
 */
export const CustomContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Custom Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          showCloseButton={false}
          size="lg"
        >
          <ModalHeader 
            title="Custom Modal Components"
            description="Using ModalHeader, ModalBody, and ModalFooter"
            onClose={() => setIsOpen(false)}
          />
          <ModalBody>
            <div className="space-y-6">
              <div className="modal-content-grid">
                <Card variant="default" className="text-center p-4">
                  <Download className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <p className="font-medium text-text">Download</p>
                  <p className="text-sm text-secondary">1.2 GB</p>
                </Card>
                <Card variant="default" className="text-center p-4">
                  <Settings className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                  <p className="font-medium text-text">Configure</p>
                  <p className="text-sm text-secondary">Settings</p>
                </Card>
                <Card variant="default" className="text-center p-4">
                  <Share2 className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <p className="font-medium text-text">Share</p>
                  <p className="text-sm text-secondary">Public</p>
                </Card>
              </div>
              
              <Alert variant="info" icon={<Info className="alert-icon" />} title="Pro Tip">
                You can use the ModalHeader, ModalBody, and ModalFooter components 
                to create custom modal layouts.
              </Alert>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Close
            </Button>
            <Button variant="primary">
              Get Started
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
};

/**
 * No overlay modal
 */
export const NoOverlay: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal without Overlay</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="No Overlay Modal"
          description="This modal appears without a background overlay"
          showOverlay={false}
          closeOnOverlayClick={false}
        >
          <p>This modal doesn&rsquo;t have a background overlay. You can still interact with the page behind it.</p>
        </Modal>
      </>
    );
  }
};

/**
 * Validation modal with shake effect
 */
export const ValidationModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isShaking, setIsShaking] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    
    const handleConfirm = () => {
      // Validate input - example: must contain "confirm"
      if (inputValue.toLowerCase().includes('confirm')) {
        setError('');
        setInputValue('');
        setIsOpen(false);
      } else {
        setError('Please type "confirm" to proceed');
        setIsShaking(true);
        // Remove shake animation after it completes
        setTimeout(() => setIsShaking(false), 500);
      }
    };
    
    const handleCancel = () => {
      setError('');
      setInputValue('');
      setIsOpen(false);
    };
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Validation Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={handleCancel}
          title="Confirm Deletion"
          description="This action cannot be undone"
          size="sm"
          className={isShaking ? 'modal-shake' : ''}
          footer={
            <>
              <Button variant="ghost" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="error" onClick={handleConfirm}>
                Delete Forever
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <Alert variant="error" title="Warning" showIcon>
              You are about to delete this item permanently. All associated data will be lost.
            </Alert>
            
            <Input
              label='Type "confirm" to proceed'
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setError(''); // Clear error when typing
              }}
              error={error}
              placeholder="Type confirm here..."
              autoFocus
            />
          </div>
        </Modal>
      </>
    );
  }
};

/**
 * Terms acceptance modal with validation
 */
export const TermsAcceptanceModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isShaking, setIsShaking] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [showError, setShowError] = useState(false);
    
    const handleContinue = () => {
      if (termsAccepted && privacyAccepted) {
        setShowError(false);
        setTermsAccepted(false);
        setPrivacyAccepted(false);
        setIsOpen(false);
      } else {
        setShowError(true);
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      }
    };
    
    const handleCancel = () => {
      setShowError(false);
      setTermsAccepted(false);
      setPrivacyAccepted(false);
      setIsOpen(false);
    };
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Terms Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={handleCancel}
          title="Accept Terms & Conditions"
          size="md"
          className={isShaking ? 'modal-shake' : ''}
          footer={
            <>
              <Button variant="ghost" onClick={handleCancel}>
                Decline
              </Button>
              <Button variant="primary" onClick={handleContinue}>
                Continue
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            {showError && (
              <Alert variant="error" size="sm">
                Please accept all terms to continue
              </Alert>
            )}
            
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => {
                    setTermsAccepted(e.target.checked);
                    setShowError(false);
                  }}
                  className="mt-1"
                />
                <span className="text-sm text-text">
                  I have read and accept the <Link href="/terms" variant="underline">Terms of Service</Link>
                </span>
              </label>
              
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacyAccepted}
                  onChange={(e) => {
                    setPrivacyAccepted(e.target.checked);
                    setShowError(false);
                  }}
                  className="mt-1"
                />
                <span className="text-sm text-text">
                  I have read and accept the <Link href="/privacy" variant="underline">Privacy Policy</Link>
                </span>
              </label>
            </div>
            
            <p className="text-xs text-secondary">
              By continuing, you agree to our data collection and usage practices.
            </p>
          </div>
        </Modal>
      </>
    );
  }
};

/**
 * Non-closeable modal
 */
export const NonCloseable: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Non-closeable Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Processing..."
          showCloseButton={false}
          closeOnOverlayClick={false}
          closeOnEscape={false}
        >
          <div className="text-center py-8">
            <Loader2 className="w-12 h-12 mx-auto mb-4 text-primary animate-spin" />
            <p>Please wait while we process your request...</p>
            <p className="text-sm text-secondary mt-2">This may take a few moments</p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsOpen(false)}
              className="mt-4"
            >
              Cancel Operation
            </Button>
          </div>
        </Modal>
      </>
    );
  }
};

/**
 * Dark mode
 */
export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' }
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div data-theme="dark">
        <Button onClick={() => setIsOpen(true)}>Open Dark Mode Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Dark Mode Modal"
          description="This modal is styled for dark mode"
          footer={
            <>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Confirm
              </Button>
            </>
          }
        >
          <p>This modal looks great in dark mode with proper contrast and styling.</p>
        </Modal>
      </div>
    );
  }
};

/**
 * Light mode
 */
export const LightMode: Story = {
  parameters: {
    backgrounds: { default: 'light' }
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div data-theme="light">
        <Button onClick={() => setIsOpen(true)}>Open Light Mode Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Light Mode Modal"
          description="This modal is styled for light mode"
          footer={
            <>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Confirm
              </Button>
            </>
          }
        >
          <p>This modal looks clean and crisp in light mode.</p>
        </Modal>
      </div>
    );
  }
};

/**
 * Neon theme modal
 */
export const NeonTheme: Story = {
  parameters: {
    backgrounds: { default: 'dark' }
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div data-theme="neon" style={{ padding: '2rem', background: 'rgb(3, 7, 18)' }}>
        <Button variant="primary" onClick={() => setIsOpen(true)}>Open Neon Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Cyberpunk Interface"
          description="Welcome to the neon-lit future"
          size="lg"
          footer={
            <>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Disconnect
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Jack In
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <p className="text-purple-300">The modal glows with neon energy in this cyberpunk theme.</p>
            <div className="p-4 bg-purple-900 bg-opacity-20 rounded-lg border border-purple-500">
              <p className="text-purple-200 text-sm">System Status: Online</p>
              <p className="text-purple-400 text-xs mt-1">Neural connection established</p>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
};

/**
 * Gold theme modal
 */
export const GoldTheme: Story = {
  parameters: {
    backgrounds: { default: 'dark' }
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div data-theme="gold" style={{ padding: '2rem', background: 'linear-gradient(135deg, #78350f, #422006)' }}>
        <Button variant="primary" onClick={() => setIsOpen(true)}>Open Premium Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="VIP Experience"
          description="Exclusive access to premium features"
          size="lg"
          footer={
            <>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Decline
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Accept VIP
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <p className="text-yellow-200">Experience luxury with our gold-themed modal design.</p>
            <div className="p-4 bg-yellow-900 bg-opacity-20 rounded-lg border border-yellow-600">
              <p className="text-yellow-300 font-semibold">VIP Status: Active</p>
              <p className="text-yellow-400 text-sm mt-1">Enjoy exclusive benefits</p>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
};

/**
 * All themes showcase
 */
export const AllThemes: Story = {
  render: () => {
    const [lightOpen, setLightOpen] = useState(false);
    const [darkOpen, setDarkOpen] = useState(false);
    const [neonOpen, setNeonOpen] = useState(false);
    const [goldOpen, setGoldOpen] = useState(false);
    
    return (
      <div className="space-y-6">
        <div data-theme="light" className="p-6 bg-white rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Light Theme</h3>
          <Button onClick={() => setLightOpen(true)}>Open Modal</Button>
          <Modal
            isOpen={lightOpen}
            onClose={() => setLightOpen(false)}
            title="Light Theme"
            size="sm"
          >
            <p>Clean and minimal light theme modal.</p>
          </Modal>
        </div>
        
        <div data-theme="dark" className="p-6 bg-gray-900 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-3">Dark Theme</h3>
          <Button onClick={() => setDarkOpen(true)}>Open Modal</Button>
          <Modal
            isOpen={darkOpen}
            onClose={() => setDarkOpen(false)}
            title="Dark Theme"
            size="sm"
          >
            <p>Sleek dark theme modal.</p>
          </Modal>
        </div>
        
        <div data-theme="neon" className="p-6 rounded-lg" style={{ background: 'rgb(3, 7, 18)' }}>
          <h3 className="text-lg font-semibold text-purple-400 mb-3">Neon Theme</h3>
          <Button onClick={() => setNeonOpen(true)}>Open Modal</Button>
          <Modal
            isOpen={neonOpen}
            onClose={() => setNeonOpen(false)}
            title="Neon Theme"
            size="sm"
          >
            <p className="text-purple-200">Cyberpunk neon theme modal.</p>
          </Modal>
        </div>
        
        <div data-theme="gold" className="p-6 rounded-lg" style={{ background: 'linear-gradient(135deg, #78350f, #422006)' }}>
          <h3 className="text-lg font-semibold text-yellow-400 mb-3">Gold Theme</h3>
          <Button onClick={() => setGoldOpen(true)}>Open Modal</Button>
          <Modal
            isOpen={goldOpen}
            onClose={() => setGoldOpen(false)}
            title="Gold Theme"
            size="sm"
          >
            <p className="text-yellow-200">Luxurious gold theme modal.</p>
          </Modal>
        </div>
      </div>
    );
  }
};

/**
 * Padding variants showcase
 */
export const PaddingVariants: Story = {
  render: () => {
    const [openModal, setOpenModal] = useState<string | null>(null);
    const paddings: Array<'none' | 'sm' | 'md' | 'lg'> = ['none', 'sm', 'md', 'lg'];
    
    return (
      <div className="flex flex-wrap gap-3">
        {paddings.map(padding => (
          <Button 
            key={padding}
            onClick={() => setOpenModal(padding)}
            variant="secondary"
          >
            Padding: {padding}
          </Button>
        ))}
        
        {paddings.map(padding => (
          <Modal
            key={padding}
            isOpen={openModal === padding}
            onClose={() => setOpenModal(null)}
            title={`Modal with ${padding} padding`}
            description="Notice how the content spacing changes with different padding values"
            padding={padding}
            size="md"
            footer={
              <>
                <Button variant="ghost" onClick={() => setOpenModal(null)}>
                  Close
                </Button>
                <Button variant="primary">
                  Action
                </Button>
              </>
            }
          >
            <div className="space-y-4">
              <p className="text-text">
                This modal uses <Badge variant="primary">{padding}</Badge> padding.
              </p>
              <Card variant="default">
                <p className="text-sm text-secondary">
                  The padding prop controls the internal spacing of the modal header, body, and footer.
                </p>
              </Card>
            </div>
          </Modal>
        ))}
      </div>
    );
  }
};

/**
 * Modal without header (only close button)
 */
export const NoHeader: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal Without Header</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          showCloseButton={true}
          padding="lg"
        >
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-text">Success!</h3>
            <p className="text-secondary">
              Your changes have been saved successfully.
            </p>
            <Button 
              variant="primary" 
              onClick={() => setIsOpen(false)}
              className="mt-4"
            >
              Continue
            </Button>
          </div>
        </Modal>
      </>
    );
  }
};

/**
 * All props showcase
 */
export const AllPropsShowcase: Story = {
  render: () => {
    const [config, setConfig] = useState({
      isOpen: false,
      size: 'md' as ModalSize,
      position: 'center' as ModalPosition,
      padding: 'md' as 'none' | 'sm' | 'md' | 'lg',
      showCloseButton: true,
      closeOnOverlayClick: true,
      closeOnEscape: true,
      showOverlay: true,
      preventScroll: true,
    });
    
    return (
      <>
        <div className="space-y-4 p-4 border rounded-lg">
          <h3 className="text-lg font-semibold text-text">Modal Configuration</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">Size</label>
              <select 
                value={config.size}
                onChange={(e) => setConfig({...config, size: e.target.value as ModalSize})}
                className="w-full px-3 py-2 rounded border"
              >
                <option value="xs">Extra Small</option>
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
                <option value="full">Full Screen</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text mb-1">Position</label>
              <select 
                value={config.position}
                onChange={(e) => setConfig({...config, position: e.target.value as ModalPosition})}
                className="w-full px-3 py-2 rounded border"
              >
                <option value="center">Center</option>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text mb-1">Padding</label>
              <select 
                value={config.padding}
                onChange={(e) => setConfig({...config, padding: e.target.value as 'none' | 'sm' | 'md' | 'lg'})}
                className="w-full px-3 py-2 rounded border"
              >
                <option value="none">None</option>
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={config.showCloseButton}
                onChange={(e) => setConfig({...config, showCloseButton: e.target.checked})}
              />
              <span className="text-sm text-text">Show Close Button</span>
            </label>
            
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={config.closeOnOverlayClick}
                onChange={(e) => setConfig({...config, closeOnOverlayClick: e.target.checked})}
              />
              <span className="text-sm text-text">Close on Overlay Click</span>
            </label>
            
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={config.closeOnEscape}
                onChange={(e) => setConfig({...config, closeOnEscape: e.target.checked})}
              />
              <span className="text-sm text-text">Close on Escape Key</span>
            </label>
            
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={config.showOverlay}
                onChange={(e) => setConfig({...config, showOverlay: e.target.checked})}
              />
              <span className="text-sm text-text">Show Overlay</span>
            </label>
            
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={config.preventScroll}
                onChange={(e) => setConfig({...config, preventScroll: e.target.checked})}
              />
              <span className="text-sm text-text">Prevent Body Scroll</span>
            </label>
          </div>
          
          <Button 
            variant="primary" 
            onClick={() => setConfig({...config, isOpen: true})}
            className="w-full"
          >
            Open Configured Modal
          </Button>
        </div>
        
        <Modal
          {...config}
          onClose={() => setConfig({...config, isOpen: false})}
          title="Configured Modal"
          description="This modal uses all the configured props"
          footer={
            <>
              <Button 
                variant="ghost" 
                onClick={() => setConfig({...config, isOpen: false})}
              >
                Cancel
              </Button>
              <Button 
                variant="primary"
                onClick={() => setConfig({...config, isOpen: false})}
              >
                Confirm
              </Button>
            </>
          }
        >
          <Alert variant="info" title="Current Configuration">
            <ul className="text-sm space-y-1">
              <li>Size: {config.size}</li>
              <li>Position: {config.position}</li>
              <li>Padding: {config.padding}</li>
              <li>Close Button: {config.showCloseButton ? 'Yes' : 'No'}</li>
              <li>Overlay Click: {config.closeOnOverlayClick ? 'Yes' : 'No'}</li>
              <li>Escape Key: {config.closeOnEscape ? 'Yes' : 'No'}</li>
              <li>Show Overlay: {config.showOverlay ? 'Yes' : 'No'}</li>
              <li>Prevent Scroll: {config.preventScroll ? 'Yes' : 'No'}</li>
            </ul>
          </Alert>
        </Modal>
      </>
    );
  }
};

/**
 * Mobile viewport - optimized for small screens
 */
export const Mobile: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Mobile Modal</h2>
          <p className="text-sm text-secondary mb-4">
            Modal optimized for mobile devices with full-width layout
          </p>
          <Button 
            variant="primary" 
            onClick={() => setIsOpen(true)}
            size="md"
            fullWidth
          >
            Open Mobile Modal
          </Button>
        </div>
        
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="full"
          position="bottom"
          title="Mobile Optimized"
          description="This modal is designed for mobile viewports"
          showCloseButton
          footer={
            <div className="flex flex-col gap-2 w-full">
              <Button 
                variant="primary"
                size="md"
                fullWidth
                onClick={() => setIsOpen(false)}
              >
                Confirm
              </Button>
              <Button 
                variant="ghost"
                size="md"
                fullWidth
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
            </div>
          }
        >
          <div className="space-y-4">
            <Alert variant="info" title="Mobile Design">
              <p className="text-sm">
                This modal uses full width on mobile devices and slides up from the bottom for easier reach.
              </p>
            </Alert>
            
            <div className="space-y-3">
              <Input
                label="Name"
                placeholder="Enter your name"
                fullWidth
              />
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                fullWidth
              />
              <TextArea
                label="Message"
                placeholder="Type your message here..."
                rows={3}
                fullWidth
              />
            </div>
          </div>
        </Modal>
      </>
    );
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphone6',
    },
  }
};

/**
 * Stacked modals with proper z-index handling
 */
export const StackedModals: Story = {
  render: () => {
    const [isFirstOpen, setIsFirstOpen] = useState(false);
    const [isSecondOpen, setIsSecondOpen] = useState(false);
    const [isThirdOpen, setIsThirdOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setIsFirstOpen(true)}>Open First Modal</Button>
        
        {/* First Modal */}
        <Modal
          isOpen={isFirstOpen}
          onClose={() => setIsFirstOpen(false)}
          title="First Modal"
          size="lg"
          zIndex={1000}
          footer={
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => setIsFirstOpen(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={() => setIsSecondOpen(true)}>
                Open Second Modal
              </Button>
            </div>
          }
        >
          <p className="text-secondary mb-4">
            This is the first modal. Click the button below to open a second modal on top of this one.
          </p>
          <Alert variant="info" size="sm">
            Notice how the second modal appears above this one with proper z-index stacking.
          </Alert>
        </Modal>
        
        {/* Second Modal */}
        <Modal
          isOpen={isSecondOpen}
          onClose={() => setIsSecondOpen(false)}
          title="Second Modal"
          size="md"
          zIndex={1010}
          footer={
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => setIsSecondOpen(false)}>
                Close This
              </Button>
              <Button variant="accent" onClick={() => setIsThirdOpen(true)}>
                Open Third Modal
              </Button>
            </div>
          }
        >
          <p className="text-secondary mb-4">
            This is the second modal, stacked on top of the first one.
          </p>
          <Alert variant="warning" size="sm">
            You can open yet another modal on top of this one!
          </Alert>
        </Modal>
        
        {/* Third Modal */}
        <Modal
          isOpen={isThirdOpen}
          onClose={() => setIsThirdOpen(false)}
          title="Third Modal"
          size="sm"
          zIndex={1020}
          footer={
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                onClick={() => {
                  setIsThirdOpen(false);
                  setIsSecondOpen(false);
                }}
              >
                Close All Above First
              </Button>
              <Button 
                variant="error" 
                onClick={() => {
                  setIsThirdOpen(false);
                  setIsSecondOpen(false);
                  setIsFirstOpen(false);
                }}
              >
                Close All
              </Button>
            </div>
          }
        >
          <p className="text-secondary mb-4">
            This is the third modal, at the top of the stack!
          </p>
          <Alert variant="success" size="sm">
            Perfect z-index stacking with {`zIndex={1020}`}
          </Alert>
        </Modal>
      </>
    );
  },
};

/**
 * Tablet viewport - medium screen optimization
 */
export const Tablet: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Tablet Modal</h2>
          <p className="text-base text-secondary mb-6">
            Modal optimized for tablet devices with appropriate sizing
          </p>
          <div className="max-w-sm">
            <Button 
              variant="primary" 
              onClick={() => setIsOpen(true)}
              size="lg"
              fullWidth
            >
              Open Tablet Modal
            </Button>
          </div>
        </div>
        
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="lg"
          position="center"
          title="Tablet Optimized Modal"
          description="Perfect size for tablet viewing"
          showCloseButton
          footer={
            <div className="flex gap-3 justify-end">
              <Button 
                variant="ghost"
                size="md"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="primary"
                size="md"
                onClick={() => setIsOpen(false)}
              >
                Save Changes
              </Button>
            </div>
          }
        >
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Settings</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className="text-sm">Enable notifications</span>
                  <input type="checkbox" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm">Dark mode</span>
                  <input type="checkbox" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm">Auto-save</span>
                  <input type="checkbox" defaultChecked />
                </label>
              </div>
            </Card>
            
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Account</h3>
              <div className="space-y-3">
                <Input
                  label="Username"
                  defaultValue="john_doe"
                  fullWidth
                />
                <Input
                  label="Email"
                  type="email"
                  defaultValue="john@example.com"
                  fullWidth
                />
              </div>
            </Card>
          </div>
        </Modal>
      </>
    );
  },
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
  }
};

/**
 * Persistent modal with validation types
 */
export const PersistentModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [validationType, setValidationType] = useState<'error' | 'warning' | 'info' | 'persistent'>('persistent');
    
    return (
      <>
        <div className="space-y-4">
          <Button onClick={() => setIsOpen(true)}>Open Persistent Modal</Button>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" onClick={() => setValidationType('error')}>Error Type</Button>
            <Button size="sm" variant="ghost" onClick={() => setValidationType('warning')}>Warning Type</Button>
            <Button size="sm" variant="ghost" onClick={() => setValidationType('info')}>Info Type</Button>
            <Button size="sm" variant="ghost" onClick={() => setValidationType('persistent')}>Persistent Type</Button>
          </div>
        </div>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Persistent Modal"
          description="This modal is persistent and won't close easily"
          persistent={true}
          validationType={validationType}
          onValidate={() => {
            // Example validation - only close if certain condition is met
            return confirm('Are you sure you want to close this modal?');
          }}
          onValidationFail={() => {
            console.log('Validation failed - modal stays open');
          }}
        >
          <div className="space-y-4">
            <p>Current validation type: <strong>{validationType}</strong></p>
            <Alert variant="info" size="sm">
              This modal has persistent={true} and uses validation. Try closing it to see the behavior.
            </Alert>
            <ul className="text-sm space-y-1">
              <li>• <strong>error</strong>: Shakes on validation fail</li>
              <li>• <strong>warning</strong>: Pulses on validation fail</li>
              <li>• <strong>info</strong>: Subtle bounce on validation fail</li>
              <li>• <strong>persistent</strong>: No animation, just stays open</li>
            </ul>
          </div>
        </Modal>
      </>
    );
  }
};

/**
 * Modal with custom validation
 */
export const CustomValidation: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{email?: string; password?: string}>({});
    
    const handleClose = async () => {
      // Clear errors
      setErrors({});
      
      // Validate form
      const newErrors: {email?: string; password?: string} = {};
      
      if (!email || !email.includes('@')) {
        newErrors.email = 'Please enter a valid email';
      }
      
      if (!password || password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return false; // Validation failed
      }
      
      // Validation passed
      setEmail('');
      setPassword('');
      return true;
    };
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Login Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Login Required"
          size="sm"
          validationType="error"
          onValidate={handleClose}
          onValidationFail={() => {
            // Modal will shake when validation fails
          }}
          footer={
            <>
              <Button variant="ghost" onClick={() => {
                setEmail('');
                setPassword('');
                setErrors({});
                setIsOpen(false);
              }}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Login
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              fullWidth
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              fullWidth
            />
            <p className="text-xs text-secondary">
              Try closing the modal without filling the form to see validation in action.
            </p>
          </div>
        </Modal>
      </>
    );
  }
};

/**
 * Modal with custom classNames
 */
export const CustomClassNames: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Custom Styled Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Custom Classes Modal"
          description="This modal uses custom CSS classes for styling"
          classNames={{
            overlay: 'custom-overlay-class',
            container: 'custom-container-class',
            content: 'custom-content-class',
            header: 'custom-header-class',
            body: 'custom-body-class',
            footer: 'custom-footer-class'
          }}
          footer={
            <div className="flex gap-2">
              <Button variant="secondary" fullWidth>Cancel</Button>
              <Button variant="primary" fullWidth>Confirm</Button>
            </div>
          }
        >
          <div className="space-y-4">
            <p>This modal demonstrates the classNames prop which allows applying custom CSS classes to nested elements:</p>
            <ul className="text-sm space-y-1">
              <li>• <code>overlay</code>: "custom-overlay-class"</li>
              <li>• <code>container</code>: "custom-container-class"</li>
              <li>• <code>content</code>: "custom-content-class"</li>
              <li>• <code>header</code>: "custom-header-class"</li>
              <li>• <code>body</code>: "custom-body-class"</li>
              <li>• <code>footer</code>: "custom-footer-class"</li>
            </ul>
            <Alert variant="info" size="sm">
              These custom classes can be used to apply specific styles without modifying the component.
            </Alert>
          </div>
        </Modal>
      </>
    );
  }
};

/**
 * Modal with async validation
 */
export const AsyncValidation: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isValidating, setIsValidating] = useState(false);
    
    const handleValidate = async () => {
      setIsValidating(true);
      
      // Simulate async validation (e.g., API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsValidating(false);
      
      // Randomly succeed or fail for demo
      return Math.random() > 0.5;
    };
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Async Validation Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Save Changes?"
          description="Your changes need to be validated before saving"
          validationType="warning"
          onValidate={handleValidate}
          onValidationFail={() => {
            alert('Validation failed! Please try again.');
          }}
          footer={
            <>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button 
                variant="primary" 
                onClick={() => setIsOpen(false)}
                disabled={isValidating}
              >
                {isValidating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Validating...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <p>This modal performs async validation when you try to close it.</p>
            <Alert variant="warning" size="sm">
              Validation randomly succeeds or fails for demonstration purposes.
            </Alert>
            {isValidating && (
              <div className="text-center py-4">
                <Loader2 className="w-8 h-8 mx-auto animate-spin text-primary" />
                <p className="text-sm text-secondary mt-2">Validating your changes...</p>
              </div>
            )}
          </div>
        </Modal>
      </>
    );
  }
};
