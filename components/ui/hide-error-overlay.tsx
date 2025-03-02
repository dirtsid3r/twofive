"use client";

import { useEffect } from "react";

export function HideErrorOverlay() {
  useEffect(() => {
    // Function to inject CSS
    const injectCSS = () => {
      const style = document.createElement('style');
      style.innerHTML = `
        /* Hide Next.js error overlay */
        body > div[data-nextjs-dialog-overlay],
        body > div[data-nextjs-dialog],
        body > div[data-nextjs-toast],
        body > div[data-nextjs-error-overlay],
        body > div[role="dialog"],
        body > div[style*="background-color: rgba(0, 0, 0, 0.5)"],
        .nextjs-container,
        #__next-build-watcher,
        #__next-error-overlay,
        .nextjs-toast-errors-parent {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
          z-index: -9999 !important;
        }
      `;
      document.head.appendChild(style);
    };

    // Try to find and remove the error overlay directly
    const removeErrorOverlay = () => {
      // Target all possible error overlay elements
      const selectors = [
        'div[data-nextjs-dialog-overlay]',
        'div[data-nextjs-dialog]',
        'div[data-nextjs-toast]',
        'div[role="dialog"]',
        'div[style*="background-color: rgba(0, 0, 0, 0.5)"]'
      ];
      
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          if (el.parentNode) {
            el.parentNode.removeChild(el);
          }
        });
      });
    };

    // Initial injection
    injectCSS();
    removeErrorOverlay();

    // Set up a MutationObserver to watch for the error overlay being added
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.addedNodes.length) {
          removeErrorOverlay();
        }
      }
    });

    // Start observing the body for changes
    observer.observe(document.body, { 
      childList: true,
      subtree: true 
    });

    // Clean up
    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
} 