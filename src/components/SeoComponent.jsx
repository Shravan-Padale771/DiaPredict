import React from 'react';
import { Helmet } from 'react-helmet-async';

// This component takes title, description, and keywords as props
// and injects them into the document's <head> section.
export default function SEO({ title, description, keywords }) {
  const fullTitle = `${title} | DiaPredict`; // Appends your site name to the title

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
}
