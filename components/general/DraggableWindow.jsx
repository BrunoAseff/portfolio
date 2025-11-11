'use client';

import { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';

const WindowControls = ({ title, onClose, onMinimize }) => (
  <div className="absolute top-0 left-0 right-0 h-12 flex items-center px-4">
    <div className="flex items-center gap-2">
      <button
        onClick={onClose}
        className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-black/60 hover:text-black transition-colors"
        aria-label="Close"
      ></button>
      <button
        onClick={onMinimize}
        className="w-4 h-4 rounded-full bg-yellow-400 flex items-center justify-center text-black/60 hover:text-black transition-colors"
        aria-label="Minimize"
      ></button>
      <button
        className="w-4 h-4 rounded-full bg-green-400 flex items-center justify-center text-black/60 hover:text-black transition-colors"
        aria-label="Maximize"
      ></button>
    </div>
    <h2 className="text-white/80 font-semibold text-center flex-grow pr-16">
      {title}
    </h2>
  </div>
);

export default function DraggableWindow({
  state,
  onClose,
  onMinimize,
  title,
  defaultPosition,
  children,
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (state === 'minimized') return null;
  if (!mounted) return null;

  return (
    <Rnd
      default={{
        ...defaultPosition,
        width: '500px',
      }}
      minHeight="430px"
      minWidth="400px"
      className="!flex flex-col relative bg-black/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl"
      dragHandleClassName="drag-handle"
      disableDragging={false}
    >
      <div className="drag-handle cursor-move">
        <WindowControls
          title={title}
          onClose={onClose}
          onMinimize={onMinimize}
        />
      </div>

      <main className="p-6 pt-16 h-full overflow-y-auto">{children}</main>
    </Rnd>
  );
}
