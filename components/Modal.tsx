import React from 'react';

export type ModalProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidthClass?: string; // e.g. max-w-3xl
};

export default function Modal({ open, title, onClose, children, footer, maxWidthClass = 'max-w-4xl' }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full ${maxWidthClass} mx-4 bg-gray-900 border border-gray-700 rounded-2xl shadow-xl overflow-hidden`}> 
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">{title || 'Modal'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-sm">Close</button>
        </div>
        <div className="p-4 md:p-6 text-white">
          {children}
        </div>
        {footer && (
          <div className="px-4 py-3 border-t border-gray-700 bg-black/30 flex gap-3 justify-end">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
