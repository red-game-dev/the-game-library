/**
 * Classname Utility Functions
 * Utilities for managing CSS class names
 */

type ClassValue = string | number | boolean | undefined | null | ClassArray | ClassObject;
type ClassArray = ClassValue[];
type ClassObject = Record<string, boolean | undefined | null>;

/**
 * Class names utility (similar to clsx/classnames)
 * Combines multiple class values into a single string
 * @param classes - Class values to combine
 * @returns Combined class string
 */
export function cn(...classes: ClassValue[]): string {
  const result: string[] = [];
  
  for (const cls of classes) {
    if (!cls) continue;
    
    if (typeof cls === 'string') {
      result.push(cls);
    } else if (typeof cls === 'number') {
      result.push(cls.toString());
    } else if (Array.isArray(cls)) {
      const inner = cn(...cls);
      if (inner) result.push(inner);
    } else if (typeof cls === 'object') {
      for (const key in cls) {
        if (cls[key]) result.push(key);
      }
    }
  }
  
  return result.join(' ');
}

/**
 * Alias for cn for compatibility
 */
export const classNames = cn;
export const clsx = cn;

/**
 * Merge class names with conflict resolution
 * Later classes override earlier ones for conflicting properties
 * @param baseClasses - Base class string
 * @param overrideClasses - Override class string
 * @returns Merged class string
 */
export function mergeClasses(baseClasses: string, overrideClasses: string): string {
  const base = baseClasses.split(' ').filter(Boolean);
  const override = overrideClasses.split(' ').filter(Boolean);
  
  // Simple merge for now - could be enhanced to handle conflicts
  return [...new Set([...base, ...override])].join(' ');
}

/**
 * Toggle a class in a class string
 * @param classes - Current class string
 * @param className - Class to toggle
 * @param force - Force add (true) or remove (false)
 * @returns Updated class string
 */
export function toggleClass(classes: string, className: string, force?: boolean): string {
  const classList = classes.split(' ').filter(Boolean);
  const index = classList.indexOf(className);
  
  if (force === true) {
    if (index === -1) classList.push(className);
  } else if (force === false) {
    if (index !== -1) classList.splice(index, 1);
  } else {
    if (index === -1) {
      classList.push(className);
    } else {
      classList.splice(index, 1);
    }
  }
  
  return classList.join(' ');
}

/**
 * Check if class string contains a specific class
 * @param classes - Class string to check
 * @param className - Class name to look for
 * @returns Whether the class exists
 */
export function hasClass(classes: string, className: string): boolean {
  return classes.split(' ').includes(className);
}

/**
 * Add classes conditionally
 * @param conditions - Object with class names as keys and conditions as values
 * @returns Combined class string
 */
export function conditionalClasses(conditions: ClassObject): string {
  return cn(conditions);
}