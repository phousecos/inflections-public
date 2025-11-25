'use client';

import { useState } from 'react';

interface NewsletterSignupProps {
  variant?: 'footer' | 'homepage';
}

export default function NewsletterSignup({ variant = 'footer' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Thanks for subscribing!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  // Homepage variant - larger, more prominent
  if (variant === 'homepage') {
    return (
      <section className="bg-white rounded-lg shadow-sm p-8 md:p-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-brand-jet mb-4">
            Stay Informed
          </h2>
          <p className="text-gray-600 mb-8">
            Get the latest insights on technology leadership, delivery excellence, 
            and workforce transformation delivered to your inbox.
          </p>

          {status === 'success' ? (
            <div className="bg-green-50 text-green-700 px-6 py-4 rounded-lg">
              {message}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent flex-1 max-w-md"
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-brand-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="text-red-600 mt-4 text-sm">{message}</p>
          )}

          <p className="text-xs text-gray-500 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    );
  }

  // Footer variant - compact
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-3">Subscribe to Inflections</h3>
      <p className="text-gray-400 text-sm mb-4">
        Get insights delivered to your inbox.
      </p>

      {status === 'success' ? (
        <p className="text-green-400 text-sm">{message}</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue flex-1"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-brand-blue text-white px-4 py-2 rounded font-semibold text-sm hover:bg-blue-700 transition disabled:opacity-50"
          >
            {status === 'loading' ? '...' : 'Join'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="text-red-400 mt-2 text-xs">{message}</p>
      )}
    </div>
  );
}
