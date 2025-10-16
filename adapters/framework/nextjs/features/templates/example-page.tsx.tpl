'use client';

import React, { useState, useTransition } from 'react';
import { validateContactForm } from '../../lib/actions/example-actions.js';

export const ContactForm: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success: boolean; message?: string; errors?: Record<string, string[]> } | null>(null);

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const actionResult = await validateContactForm(formData);
      setResult(actionResult);
      
      if (actionResult.success) {
        // Reset form on success
        const form = document.getElementById('contact-form') as HTMLFormElement;
        form?.reset();
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Contact Form</h2>
      <p className="text-gray-600 mb-6">
        This form uses Server Actions for validation and processing
      </p>

      {result && (
        <div className={\`mb-4 p-4 rounded \${result.success ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}\`}>
          {result.success ? (
            <div>
              <p className="font-medium">{result.message}</p>
              {result.data && (
                <div className="mt-2 text-sm">
                  <p>Name: {result.data.name}</p>
                  <p>Email: {result.data.email}</p>
                  <p>Submitted: {new Date(result.data.submittedAt).toLocaleString()}</p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <p className="font-medium">{result.error}</p>
              {result.fieldErrors && (
                <ul className="mt-2 list-disc list-inside">
                  {Object.entries(result.fieldErrors).map(([field, errors]) => (
                    <li key={field}>
                      {field}: {errors.join(', ')}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}

      <form id="contact-form" action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your message here..."
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};
