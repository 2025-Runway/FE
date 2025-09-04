'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      style={
        {
          '--normal-bg': 'var(--color-point-400)',
          '--normal-text': 'var(--color-point-000)',
          '--normal-border': 'var(--color-point-400)',
          '--success-bg': 'var(--color-point-000)',
          '--success-text': 'var(--color-point-400)',
          '--success-border': 'var(--color-point-400)',
          '--error-bg': 'var(--color-errorpoint)',
          '--error-text': 'var(--color-point-000)',
          '--error-border': 'var(--color-errorpoint)',
          '--info-bg': 'var(--color-point-000)',
          '--info-text': 'var(--color-point-400)',
          '--info-border': 'var(--color-point-400)',
          '--warning-bg': 'var(--color-point-000)',
          '--warning-text': 'var(--color-point-400)',
          '--warning-border': 'var(--color-point-400)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
