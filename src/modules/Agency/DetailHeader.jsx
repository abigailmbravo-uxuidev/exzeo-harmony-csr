import React from 'react';

const DetailHeader = ({ agency }) => {
  if (!agency || !agency.agencyCode) {
    return (
      <div className="detailHeader">
        <section id="agencyDetails" className="agencyDetails" />
        <section id="agency-name" className="entityName">
          <h4 className="agency-name">CREATE AGENCY</h4>
        </section>
      </div>
    );
  }
  return (
    <div className="detailHeader" data-test="detail-header">
      <section id="agencyDetails" className="agencyDetails">
        <h4 className="agency-code">{agency.agencyCode}</h4>
      </section>
      <section id="agency-name" className="entityName">
        <h4 className="agency-name">
          {agency.displayName}{' '}
          <span className="font-weight-normal legal-name">
            | {agency.legalName}
          </span>
        </h4>
      </section>
    </div>
  );
};

export default DetailHeader;
