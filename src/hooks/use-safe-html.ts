import { useCallback } from 'react';

export function useSafeHtml() {
  const parseHtml = useCallback((html: string) => {
    return { dangerouslySetInnerHTML: { __html: html } };
  }, []);

  return { parseHtml };
}