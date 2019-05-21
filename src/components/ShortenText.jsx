import React from 'react';

const ShortenText = ({ text, limit = 100 }) => {
  if (!text || typeof text !== 'string') return '';
  
  const re = new RegExp(`^(.{${limit}}[^\\s]*).*`);
  return text.length <= limit 
    ? <span>{text}</span> 
    : <span title={text}>{text.replace(re, '$1')}&hellip;</span>;
};

export default ShortenText;