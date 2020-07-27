import React from 'react';

const ClaimsIndicator = ({ claims = [] }) => {
  if (!claims.length) {
    return null;
  }
  const openClaims = claims.filter(c =>
    c.status?.toLowerCase().includes('open')
  );

  return (
    <div className={`${!!openClaims.length ? 'open claims' : 'claims'}`}>
      <svg
        id="claim-graphic"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 90.39 80"
      >
        <path
          className="claim-fill"
          d="M90.06,37.84a2.24,2.24,0,0,1,.15,3.59l-3.28,3.75a2.24,2.24,0,0,1-3.59.16L47.56,13.78a2.29,2.29,0,0,0-3.44,0L8.34,45.34c-1.25,1.15-2.4,1.09-3.44-.16L1.47,41.43a2.24,2.24,0,0,1,.15-3.59l40-35.31a6.46,6.46,0,0,1,8.44,0L65.84,16.59V8.46A2.41,2.41,0,0,1,68.34,6h10a2.44,2.44,0,0,1,1.8.71,2.47,2.47,0,0,1,.7,1.79V29.71ZM45.84,18.93,80.06,49.09a2.21,2.21,0,0,0,.39.31.69.69,0,0,0,.39.16v28.9a2.44,2.44,0,0,1-.71,1.8,2.4,2.4,0,0,1-1.79.7H50.84l-6.25-8.59,16.25-10L37.71,41l9.38,18.6-16.25,10L36.62,81H13.34a2.4,2.4,0,0,1-2.5-2.5V49.56a1.16,1.16,0,0,0,.47-.16c.2-.1.31-.21.31-.31Z"
          transform="translate(-0.64 -0.96)"
        />
      </svg>
      <span>CLAIMS</span>
    </div>
  );
};

export default ClaimsIndicator;
