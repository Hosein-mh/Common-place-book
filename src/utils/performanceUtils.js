export class PerformanceUtils {
  static measureRenderTime(componentName, renderFunction) {
    const startTime = performance.now();
    const result = renderFunction();
    const endTime = performance.now();
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} render time: ${endTime - startTime} milliseconds`);
    }
    
    return result;
  }

  static debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  }

  static throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  static async measureAsyncOperation(name, operation) {
    const startTime = performance.now();
    try {
      const result = await operation();
      const endTime = performance.now();
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`${name} completed in ${endTime - startTime} milliseconds`);
      }
      
      return result;
    } catch (error) {
      const endTime = performance.now();
      console.error(`${name} failed after ${endTime - startTime} milliseconds:`, error);
      throw error;
    }
  }
}