import React from 'react';

/**
 * Text atom component - reusable text elements
 * @param {string} variant - The type of text (heading, subheading, body, etc.)
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - The content to be displayed
 */
const Text = ({ variant = 'body', className = '', children }) => {
  const variantMapping = {
    title: 'h1',
    heading: 'h2',
    subheading: 'h3',
    body: 'p',
    score: 'span'
  };

  const Component = variantMapping[variant] || 'p';
  
  return (
    <Component className={`text-${variant} ${className}`}>
      {children}
    </Component>
  );
};

export default Text;