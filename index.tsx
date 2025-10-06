/* tslint:disable */
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

document.addEventListener('DOMContentLoaded', () => {
  const copyableElements =
    document.querySelectorAll<HTMLElement>('.copyable');

  copyableElements.forEach((element) => {
    // Add accessibility attributes
    element.setAttribute('role', 'button');
    element.setAttribute('tabindex', '0');
    element.setAttribute('aria-label', 'Copy to clipboard');

    const handleClick = () => {
      const textToCopy = element.dataset.copyText || element.textContent;
      if (!textToCopy) return;

      navigator.clipboard
        .writeText(textToCopy.trim())
        .then(() => {
          const originalText = element.innerHTML;
          element.textContent = 'Copied!';
          element.classList.add('copied');

          setTimeout(() => {
            element.innerHTML = originalText;
            element.classList.remove('copied');
          }, 2000);
        })
        .catch((err) => {
          console.error('Failed to copy text: ', err);
          // Optional: Show an error message to the user
          const originalText = element.innerHTML;
          element.textContent = 'Error!';
          setTimeout(() => {
            element.innerHTML = originalText;
          }, 2000);
        });
    };

    element.addEventListener('click', handleClick);
    element.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault(); // Prevent scrolling on spacebar
        handleClick();
      }
    });
  });
});
