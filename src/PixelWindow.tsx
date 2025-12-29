import { getFrame } from './frame';
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

export const PixelWindow = ({
  style = {},
  stroke = '#000',
  frame = '#333',
  background = '#DDD',
  pixel = 160,
  children,
}: {
  style?: React.CSSProperties,
  pixel?: number,
  stroke?: string
  frame?: string
  background?: string
  children: ReactNode;
}) => {

  const pixelFrame = getFrame({
    size: pixel,
    stroke,
    frame,
    background,
  });

  return (
    <div
      className="window"
      style={{
        width: '100%',
        height: '100%',
        borderImage: `url(${pixelFrame})`,
        borderImageSlice: '49% 49% fill',
        borderImageWidth: `${pixel}px`,
      }}
    >
      <div style={{ padding: `${pixel}px`}}>
        <div
          style={{ boxSizing: 'border-box', ...style }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export const FreePixelWindow = ({
  name,
  children,
  pixel = 16,
  stroke = '#000',
  frame = '#333',
  background = '#DDD',
  position: initialPosition = { x: 100, y: 100 },
  style,
  minWidth = 120,
  minHeight = 100,
  onChange,
}: {
  name?: string;
  children: ReactNode;
  pixel?: number;
  stroke?: string;
  frame?: string;
  background?: string;
  position?: { x: number; y: number };
  style?: React.CSSProperties;
  minWidth?: number;
  minHeight?: number;
  onChange?: (position: { x: number; y: number }, size: { width: number; height: number }) => void;
}) => {

  const [position, setPosition] = useState(() => {
    if (name) {
      const savedPosition = localStorage.getItem(`${name}-position`);
      return savedPosition ? JSON.parse(savedPosition) : initialPosition;
    }
    return initialPosition;
  });

  const [size, setSize] = useState(() => {
    const savedSize = localStorage.getItem(`${name}-size`);
    return savedSize ? JSON.parse(savedSize) : { width: 300, height: 200 };
  });

  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ width: 0, height: 0, mouseX: 0, mouseY: 0 });

  useEffect(() => {
    if (onChange) {
      onChange(position, size);
    }
  }, [position, size, onChange]);

  useEffect(() => {
    if (name) {
      localStorage.setItem(`${name}-position`, JSON.stringify(position));
      localStorage.setItem(`${name}-size`, JSON.stringify(size));
    }
  }, [name, position, size]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    } else if (isResizing) {
      const deltaX = e.clientX - resizeStart.mouseX;
      const deltaY = e.clientY - resizeStart.mouseY;

      setSize({
        width: Math.max(resizeStart.width + deltaX, minWidth),
        height: Math.max(resizeStart.height + deltaY, minHeight),
      });
    }
  }, [isDragging, isResizing, dragStart, resizeStart, minWidth, minHeight]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      width: size.width,
      height: size.height,
      mouseX: e.clientX,
      mouseY: e.clientY,
    });
  };

  const pixelFrame = getFrame({
    size: pixel,
    stroke,
    frame,
    background,
  });

  return createPortal(
    <div
      style={{
        position: 'absolute',
        overflow: 'hidden',
        resize: 'none',
        top: position.y,
        left: position.x,
        width: size.width,
        height: size.height,
        borderImage: `url(${pixelFrame})`,
        borderImageSlice: '49% 49% fill',
        borderImageWidth: `${pixel}px`,
      }}
      onMouseUp={handleMouseUp}
    >
      <div 
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={{
          height: `${pixel}px`,
          cursor: "grab",
          userSelect: "none"
        }}
      ></div>
      <div style={{
        padding: `${pixel}px`,
        paddingTop: 0,
        height: `calc(100% - ${pixel}px)`,
        boxSizing: 'border-box',
        ...style
      }}>{children}</div>
      <div
        onMouseDown={handleResizeStart}
        style={{
          position: 'absolute',
          width: `${pixel}px`,
          height: `${pixel}px`,
          cursor: 'se-resize',
          bottom: 0,
          right: 0,
        }}
      ></div>
    </div>,
    document.body
  );
};
