import { useState } from 'react';

export default function useCopyToClipboard() {
  const [copiedText, setCopiedText] = useState(null);

  const copy = async (text) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      const permissionsResult = await navigator.permissions.query({ name: 'clipboard-write' });
      if (permissionsResult.state === 'granted' || permissionsResult.state === 'prompt') {
        /* write to the clipboard now */
        await navigator.clipboard.writeText(text);
        setCopiedText(text);
        return true;
      }
      return false;
    } catch (error) {
      console.warn('Copy failed', error);
      setCopiedText(null);
      return false;
    }
  };

  return [copiedText, copy];
}
