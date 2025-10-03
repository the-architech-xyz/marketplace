import React from 'react';
import { z } from 'zod';
import { FormBuilder, FormFieldProps } from './FormBuilder';

/**
 * Example Form Component
 * Demonstrates how to use the FormBuilder with various field types
 */

// Example form schema
const exampleFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  age: z.number().min(18, 'You must be at least 18 years old'),
  bio: z.string().optional(),
  country: z.string().min(1, 'Please select a country'),
  newsletter: z.boolean().optional(),
  gender: z.enum(['male', 'female', 'other']),
  notifications: z.boolean().optional(),
});

type ExampleFormData = z.infer<typeof exampleFormSchema>;

// Example form fields configuration
const exampleFormFields: FormFieldProps<ExampleFormData>[] = [
  {
    type: 'input',
    name: 'name',
    label: 'Full Name',
    placeholder: 'Enter your full name',
    required: true,
    inputType: 'text',
  },
  {
    type: 'input',
    name: 'email',
    label: 'Email Address',
    placeholder: 'Enter your email',
    required: true,
    inputType: 'email',
  },
  {
    type: 'input',
    name: 'age',
    label: 'Age',
    placeholder: 'Enter your age',
    required: true,
    inputType: 'number',
  },
  {
    type: 'textarea',
    name: 'bio',
    label: 'Bio',
    placeholder: 'Tell us about yourself',
    rows: 4,
  },
  {
    type: 'select',
    name: 'country',
    label: 'Country',
    placeholder: 'Select your country',
    required: true,
    options: [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'au', label: 'Australia' },
      { value: 'de', label: 'Germany' },
      { value: 'fr', label: 'France' },
    ],
  },
  {
    type: 'checkbox',
    name: 'newsletter',
    label: 'Subscribe to newsletter',
  },
  {
    type: 'radio',
    name: 'gender',
    label: 'Gender',
    required: true,
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'other', label: 'Other' },
    ],
  },
  {
    type: 'switch',
    name: 'notifications',
    label: 'Enable notifications',
  },
];

// Example form component
export function ExampleForm() {
  const handleSubmit = async (data: ExampleFormData) => {
    console.log('Form submitted with data:', data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert('Form submitted successfully!');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <FormBuilder
        schema={exampleFormSchema}
        fields={exampleFormFields}
        onSubmit={handleSubmit}
        title="Example Form"
        description="This form demonstrates all available field types"
        submitLabel="Submit Form"
        resetLabel="Reset Form"
        showReset={true}
      />
    </div>
  );
}
