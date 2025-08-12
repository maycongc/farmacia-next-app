import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface EllipsisTooltipProps {
  children: React.ReactNode;
  className?: string;
  tooltip?: string;
}

export const EllipsisTooltip: React.FC<EllipsisTooltipProps> = props => {
  const { children, className, tooltip } = props;
  const textRef = useRef<HTMLSpanElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (showTooltip && textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      setCoords({ x: rect.left + rect.width / 2, y: rect.bottom });
      setVisible(true);
    } else if (visible) {
      // Aguarda a animação de fade-out antes de remover do DOM
      const timeout = setTimeout(() => setVisible(false), 180);
      return () => clearTimeout(timeout);
    } else {
      setCoords(null);
    }
  }, [showTooltip, visible]);

  return (
    <>
      <span
        ref={textRef}
        className={`truncate ${className ?? ''}`}
        style={{
          maxWidth: '100%',
          verticalAlign: 'bottom',
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </span>
      {coords &&
        visible &&
        createPortal(
          <span
            className={`fixed px-2 py-1 w-max max-w-xs bg-gray-900 text-white dark:bg-gray-700 dark:text-gray-100 text-xs rounded shadow-lg whitespace-pre-line transition-all duration-200 ${
              showTooltip ? 'animate-fade-in' : 'animate-fade-out'
            }`}
            style={{
              left: coords.x,
              top: coords.y + 6,
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
              zIndex: 100,
            }}
          >
            {tooltip ?? (typeof children === 'string' ? children : '')}
          </span>,
          document.body,
        )}
    </>
  );
};
