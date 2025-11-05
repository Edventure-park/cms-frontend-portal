/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';

export type MarkdownEditorProps = {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  className?: string;
  preview?: boolean;
  onTogglePreview?: (next: boolean) => void;
  rows?: number;
};

// very light-weight markdown rendering to avoid new deps
function renderMarkdown(markdown: string) {
  return markdown
    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-3">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mb-2">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mb-2">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-emerald-500 pl-4 italic my-2">$1</blockquote>')
    .replace(/\n/g, '<br/>');
}

export default function MarkdownEditor({
  value,
  onChange,
  placeholder,
  className = '',
  preview,
  onTogglePreview,
  rows = 16,
}: MarkdownEditorProps) {
  const [internalPreview, setInternalPreview] = useState<boolean>(!!preview);
  const isPreview = preview !== undefined ? preview : internalPreview;
  const taRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (preview !== undefined) setInternalPreview(preview);
  }, [preview]);

  const toggle = () => {
    if (onTogglePreview) onTogglePreview(!isPreview);
    else setInternalPreview(!isPreview);
  };

  const getSelection = () => {
    const ta = taRef.current;
    if (!ta) return { start: value.length, end: value.length };
    return { start: ta.selectionStart ?? 0, end: ta.selectionEnd ?? 0 };
  };

  const applyChange = (next: string, selStart?: number, selEnd?: number) => {
    onChange(next);
    requestAnimationFrame(() => {
      const ta = taRef.current;
      if (!ta) return;
      if (selStart !== undefined && selEnd !== undefined) {
        ta.focus();
        ta.setSelectionRange(selStart, selEnd);
      }
    });
  };

  const wrapSelection = (prefix: string, suffix = '') => {
    const { start, end } = getSelection();
    const before = value.slice(0, start);
    const selected = value.slice(start, end);
    const after = value.slice(end);
    const next = `${before}${prefix}${selected}${suffix}${after}`;
    // place cursor around selection
    const newStart = start + prefix.length;
    const newEnd = newStart + selected.length;
    applyChange(next, newStart, newEnd);
  };

  const insertLinePrefix = (marker: string) => {
    const ta = taRef.current;
    const { start, end } = getSelection();
    const text = value;
    // find line starts
    const before = text.slice(0, start);
    const selection = text.slice(start, end);
    const after = text.slice(end);
    const block = selection || '';
    const lines = block.split(/\n/);
    const transformed = lines.map(l => (l.startsWith(marker) ? l : `${marker}${l}`)).join('\n');
    const next = `${before}${transformed}${after}`;
    applyChange(next, start, start + transformed.length);
  };

  const insertHeading = (level: 1|2|3|4|5|6) => {
    const hashes = '#'.repeat(level) + ' ';
    // Insert at start of current line
    const { start, end } = getSelection();
    const text = value;
    const lineStart = text.lastIndexOf('\n', start - 1) + 1;
    const before = text.slice(0, lineStart);
    const line = text.slice(lineStart, end);
    const after = text.slice(end);
    const hasHeading = /^(#+\s)/.test(line);
    const lineNoHeading = hasHeading ? line.replace(/^#+\s/, '') : line;
    const nextLine = `${hashes}${lineNoHeading}`;
    const next = `${before}${nextLine}${after}`;
    applyChange(next, lineStart + hashes.length, lineStart + nextLine.length);
  };

  const insertHR = () => {
    const { start } = getSelection();
    const before = value.slice(0, start);
    const after = value.slice(start);
    const block = `${before}\n\n---\n\n${after}`;
    applyChange(block, start + 6, start + 6);
  };

  const insertLink = () => {
    const { start, end } = getSelection();
    const selected = value.slice(start, end) || 'link-text';
    const url = 'https://';
    const before = value.slice(0, start);
    const after = value.slice(end);
    const md = `[${selected}](${url})`;
    const next = `${before}${md}${after}`;
    applyChange(next, start + 1, start + 1 + selected.length);
  };

  const insertInlineCode = () => wrapSelection('`', '`');
  const insertBold = () => wrapSelection('**', '**');
  const insertItalic = () => wrapSelection('*', '*');
  const insertQuote = () => insertLinePrefix('> ');
  const insertUL = () => insertLinePrefix('- ');
  const insertOL = () => insertLinePrefix('1. ');

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-300">Markdown</div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => insertHeading(1)} className="text-xs px-2 py-1 bg-black/40 border border-gray-600 text-gray-300 rounded hover:bg-gray-800">H1</button>
          <button type="button" onClick={() => insertHeading(2)} className="text-xs px-2 py-1 bg-black/40 border border-gray-600 text-gray-300 rounded hover:bg-gray-800">H2</button>
          <button type="button" onClick={() => insertHeading(3)} className="text-xs px-2 py-1 bg-black/40 border border-gray-600 text-gray-300 rounded hover:bg-gray-800">H3</button>
          <button type="button" onClick={() => insertHeading(4)} className="text-xs px-2 py-1 bg-black/40 border border-gray-600 text-gray-300 rounded hover:bg-gray-800">H4</button>
          <button type="button" onClick={() => insertHeading(5)} className="text-xs px-2 py-1 bg-black/40 border border-gray-600 text-gray-300 rounded hover:bg-gray-800">H5</button>
          <button type="button" onClick={() => insertHeading(6)} className="text-xs px-2 py-1 bg-black/40 border border-gray-600 text-gray-300 rounded hover:bg-gray-800">H6</button>
          <span className="w-px h-4 bg-gray-700" />
          <button type="button" onClick={insertBold} className="text-xs px-2 py-1 bg-black/40 border border-gray-600 text-gray-300 rounded hover:bg-gray-800 font-bold">B</button>
          <button type="button" onClick={insertItalic} className="text-xs px-2 py-1 bg-black/40 border border-gray-600 text-gray-300 rounded hover:bg-gray-800 italic">I</button>
          <button type="button" onClick={insertInlineCode} className="text-xs px-2 py-1 bg-black/40 border border-gray-600 text-gray-300 rounded hover:bg-gray-800">`code`</button>
          <button type="button" onClick={insertLink} className="text-xs px-2 py-1 bg-black/40 border border-gray-600 text-gray-300 rounded hover:bg-gray-800">Link</button>
          <span className="w-px h-4 bg-gray-700" />
          <button type="button" onClick={insertUL} className="text-xs px-2 py-1 bg-black/40 border border-gray-600 text-gray-300 rounded hover:bg-gray-800">• List</button>
          <button type="button" onClick={insertOL} className="text-xs px-2 py-1 bg-black/40 border border-gray-600 text-gray-300 rounded hover:bg-gray-800">1. List</button>
          <button type="button" onClick={insertQuote} className="text-xs px-2 py-1 bg-black/40 border border-gray-600 text-gray-300 rounded hover:bg-gray-800">Quote</button>
          <button type="button" onClick={insertHR} className="text-xs px-2 py-1 bg-black/40 border border-gray-600 text-gray-300 rounded hover:bg-gray-800">HR</button>
          <button type="button" onClick={toggle} className="text-xs px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-colors">
            {isPreview ? 'Edit' : 'Preview'}
          </button>
        </div>
      </div>

      {!isPreview ? (
        <textarea
          ref={taRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || 'Write in Markdown...'}
          rows={rows}
          className="w-full px-4 py-3 bg-black/40 border border-cyan-500/20 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white placeholder-gray-500 transition-all outline-none resize-y font-mono text-sm"
        />
      ) : (
        <div className="w-full min-h-[300px] px-4 py-3 bg-black/40 border border-cyan-500/20 rounded-xl text-white overflow-auto">
          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }} />
        </div>
      )}
    </div>
  );
}
