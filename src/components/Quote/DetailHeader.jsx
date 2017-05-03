import React from 'react';

const DetailHeader = (data) => {
  console.log('data', data);
  return (
    <div>
      <div className="detailHeader">
        <section id="quoteDetails" className="quoteDetails">
          <dl>
            <div>
              <dt>Quote Number</dt>
              <dd>[Quote Number]</dd>
            </div>
          </dl>
        </section>
        <section id="propertyAddress" className="propertyAddress">
          <dl>
            <div>
              <dt>Property Address</dt>
              <dd>[Address 1]</dd>
              <dd>[Address 2]</dd>
              <dd>[City],&nbsp;[ST]&nbsp;[Zip]</dd>
            </div>
          </dl>
        </section>
        <section id="propertyCounty" className="propertyCounty">
          <dl>
            <div>
              <dt>Property County</dt>
              <dd>[County]</dd>
            </div>
          </dl>
        </section>
        <section id="territory" className="territory">
          <dl>
            <div>
              <dt>Territory</dt>
              <dd>[Territory]</dd>
            </div>
          </dl>
        </section>
        <section id="applicantPhone" className="applicantPhone">
          <dl>
            <div>
              <dt>Policyholder Phone</dt>
              <dd>[Policyholder Phone]</dd>
            </div>
          </dl>
        </section>
        <section id="quoteStatus" className="quoteStatus">
          <dl>
            <div>
              <dt>Quote Status</dt>
              <dd>[Quote Status]</dd>
            </div>
          </dl>
        </section>
        <section id="quoteEffectiveDate" className="quoteEffectiveDate">
          <dl>
            <div>
              <dt>Effective Date</dt>
              <dd>[Effective Date]</dd>
            </div>
          </dl>
        </section>
        <section id="premium" className="premium">
          <dl>
            <div>
              <dt>Current Premium</dt>
              <dd>$ [Premium]</dd>
            </div>
          </dl>
        </section>
      </div>
    </div>);
};

export default DetailHeader;
