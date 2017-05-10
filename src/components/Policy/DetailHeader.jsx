import React from 'react';

const DetailHeader = () =>
<div>
      <div className="detailHeader">
        <section id="quoteDetails" className="quoteDetails">
          <dl>
            <div>
              <dt>Quote Number</dt>
              <dd>12-123456</dd>
            </div>
          </dl>
        </section>
        <section id="propertyAddress" className="propertyAddress">
          <dl>
            <div>
              <dt>Property Address</dt>
              <dd>5085 East Waldorf Dr.</dd>
              <dd>Address two here</dd>
              <dd>Tampa,&nbsp;FL&nbsp;33333</dd>
            </div>
          </dl>
        </section>
        <section id="propertyCounty" className="propertyCounty">
          <dl>
            <div>
              <dt>Property County</dt>
              <dd>Hillsborough</dd>
            </div>
          </dl>
        </section>
        <section id="territory" className="territory">
          <dl>
            <div>
              <dt>Territory</dt>
              <dd>80-1</dd>
            </div>
          </dl>
        </section>
        <section id="policyholderPhone" className="policyholderPhone">
          <dl>
            <div>
              <dt>Policyholder Phone</dt>
              <dd>(777) 777-7777</dd>
            </div>
          </dl>
        </section>
        <section id="policyStatus" className="policyStatus">
          <dl>
            <div>
              <dt>Policy Status</dt>
              <dd>In Force</dd>
            </div>
          </dl>
        </section>
        <section id="policyEffectiveDate" className="policyEffectiveDate">
          <dl>
            <div>
              <dt>Effective Date</dt>
              <dd>03/01/2017</dd>
            </div>
          </dl>
        </section>
        <section id="cencellationDate" className="cencellationDate">
          <dl>
            <div>
              <dt>Cancellation Date</dt>
              <dd>03/01/2018</dd>
            </div>
          </dl>
        </section>
        <section id="premium" className="premium">
          <dl>
            <div>
              <dt>Current Premium</dt>
              <dd>$ 3,422</dd>
            </div>
          </dl>
        </section>
      </div>
    </div>

export default DetailHeader;
