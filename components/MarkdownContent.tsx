'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Customize heading styles
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold text-brand-jet mt-10 mb-4">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-bold text-brand-jet mt-10 mb-4">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-bold text-brand-jet mt-8 mb-3">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-lg font-bold text-brand-jet mt-6 mb-2">{children}</h4>
        ),
        // Paragraphs
        p: ({ children }) => (
          <p className="mb-6 leading-relaxed">{children}</p>
        ),
        // Links
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-brand-blue hover:underline"
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {children}
          </a>
        ),
        // Lists
        ul: ({ children }) => (
          <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="leading-relaxed">{children}</li>
        ),
        // Blockquotes
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-brand-blue pl-6 italic text-gray-600 my-6">
            {children}
          </blockquote>
        ),
        // Code blocks
        code: ({ className, children }) => {
          const isInline = !className;
          if (isInline) {
            return (
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-brand-jet">
                {children}
              </code>
            );
          }
          return (
            <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono my-6">
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6">
            {children}
          </pre>
        ),
        // Images
        img: ({ src, alt }) => (
          <img
            src={src}
            alt={alt || ''}
            className="rounded-lg shadow-md my-6 max-w-full"
          />
        ),
        // Horizontal rule
        hr: () => (
          <hr className="my-8 border-gray-200" />
        ),
        // Tables (GFM)
        table: ({ children }) => (
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border border-gray-200 rounded-lg">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-gray-50">{children}</thead>
        ),
        th: ({ children }) => (
          <th className="px-4 py-2 text-left font-semibold border-b border-gray-200">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-2 border-b border-gray-100">{children}</td>
        ),
        // Strong and emphasis
        strong: ({ children }) => (
          <strong className="font-bold text-brand-jet">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic">{children}</em>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
