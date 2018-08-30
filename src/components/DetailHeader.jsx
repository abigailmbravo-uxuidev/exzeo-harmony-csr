import React from 'react';

import PolicyDetailHeader from '../components/Policy/DetailHeader';
import QuoteDetailHeader from '../components/Quote/DetailHeader';

const CONFIG = {
  policy: <PolicyDetailHeader />,
  quote: <QuoteDetailHeader />
};

export const DetailHeader = ({ context }) => (CONFIG[context]);
export default DetailHeader;
