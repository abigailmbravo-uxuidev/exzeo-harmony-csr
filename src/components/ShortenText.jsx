import React from 'react';

const ShortenText = ({ text, limit = 100 }) => {
  if (!text || typeof text !== 'string') return '';
  
  return text.length <= limit 
    ? <span>{text}</span> 
    : <span title={text}>{text.substring(0, (text + ' ').lastIndexOf(' ', limit))}&hellip;</span>;
};

export default ShortenText;