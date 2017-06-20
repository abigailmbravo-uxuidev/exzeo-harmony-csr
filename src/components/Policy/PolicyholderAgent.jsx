import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PolicyConnect from '../../containers/Policy';
import ClearErrorConnect from '../Error/ClearError';
import normalizePhone from '../Form/normalizePhone';

const handleGetPolicy = (state) => {
  const model = state.appState ? state.appState.modelName : undefined;
  const previousTask = model && state.cg[model] && state.cg[model].data ? state.cg[model].data.previousTask : undefined;
  return (previousTask && previousTask.value) ? previousTask.value[0] : {};
};

export const PolicyholderAgent = (props) => {
  const {
policyHolders,
policyHolderMailingAddress
} = props.policy;

  return (
    <PolicyConnect>
      <ClearErrorConnect />
      <div className="route-content">
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            <section className="policyholder-cards">
              <h3>Policyholder</h3>
              { policyHolders && policyHolders.map((policyHolder, index) => (<div key={`ph${index}`} className="primary-policyholder contact card">
                <div className="contact-title"><i className="fa fa-address-card-o" /><label>Policyholder {index + 1}</label></div>
                <div className="contact-details">
                  <h4>{`${policyHolder.firstName} ${policyHolder.lastName}`}</h4>
                  <p>{`${policyHolderMailingAddress.address1} ${policyHolderMailingAddress.address2 ? policyHolderMailingAddress.address2 : ''}
${policyHolderMailingAddress.city} ${policyHolderMailingAddress.state}, ${policyHolderMailingAddress.zip}`}</p>
                  <div className="contact-methods">
                    <p className="primary-phone"><i className="fa fa-phone-square" />
                      <a href={`tel: ${(policyHolder.primaryPhoneNumber)}`}>{normalizePhone(policyHolder.primaryPhoneNumber)}</a>
                    </p>
                    { policyHolder.secondaryPhoneNumber && <p className="secondary-phone">
                      <small>2<sup>ND</sup><i className="fa fa-phone" /></small>
                      <a href={`tel: ${policyHolder.secondaryPhoneNumber}`}>{normalizePhone(policyHolder.secondaryPhoneNumber)}</a>
                    </p>
}
                    <p className="email">
                      <a href={`mailto: ${policyHolder.emailAddress}`}><i className="fa fa-envelope" />{policyHolder.emailAddress}</a>
                    </p>
                  </div>
                </div>

              </div>))
}
            </section>
            <section className="agency-cards">
              <h3>Agency / Agent</h3>
              <div className="agency contact card">
                <div className="contact-title"><i className="fa fa-address-book" /><label>Agency</label></div>
                <div className="contact-details">
                  <h4>13428 GREAT FLORIDA INS - PT CHARLOTTE | ALTERNATE NAME HERE</h4>
                  <p>2762 Tamiami Trl Unit A, Port Charlotte, FL 33952</p>
                  <div className="contact-methods">
                    <p className="primary-phone">
                      <a href="tel: 9417777755"><i className="fa fa-phone-square" />(941) 777-7755</a>
                    </p>
                    <p className="fax">
                      <a href="tel: 9417777722"><i className="fa fa-fax" />(941) 777-7722</a>
                    </p>
                    <p className="email">
                      <a href="mailto:help@greatflorida.com"><i className="fa fa-envelope" />help@greatflorida.com</a>
                    </p>
                  </div>
                  <div className="additional-contacts">
                    <ul>
                      <li>
                        <div>
                          <h5>Laurie Cyr</h5>
                          <span>PI Manager</span>
                        </div>
                        <div className="contact-methods">
                          <p><a href="mailto:laurie.cyr@greatflorida.com"><i className="fa fa-envelope" />laurie.cyr@greatflorida.com</a></p>
                        </div>
                      </li>
                      <li>
                        <div>
                          <h5>Wendy North</h5>
                          <span>Pricipal</span>
                        </div>
                        <div className="contact-methods">
                          <p><a href="mailto:wendy.north@greatflorida.com"><i className="fa fa-envelope" />wendy.north@greatflorida.com</a></p>
                        </div>
                      </li>
                      <li>
                        <div>
                          <h5>Yanet Coursen</h5>
                          <span>Sales Manager</span>
                        </div>
                        <div className="contact-methods" />
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
              <div className="agent contact card">
                <div className="contact-title"><i className="fa fa-address-card" /><label>Agent</label></div>
                <div className="contact-details">
                  <h4><a href="">46129</a>&nbsp;LAURIE CYR</h4>
                  <p>2762 Tamiami Trl Unit A, Port Charlotte, FL 33952</p>
                  <div className="contact-methods">
                    <p className="primary-phone">
                      <a href="tel: 9417777755"><i className="fa fa-phone-square" />(941) 777-7755</a>
                    </p>
                    <p className="secondary-phone">
                      <a href="tel: 9417777333"><small>2<sup>ND</sup><i className="fa fa-phone" /></small>(941) 777-7333</a>
                    </p>
                    <p className="fax">
                      <a href="tel: 9417777722"><i className="fa fa-fax" />(941) 777-7722</a>
                    </p>
                    <p className="email">
                      <a href="mailto:laurie.cyr@greatflorida.com"><i className="fa fa-envelope" />laurie.cyr@greatflorida.com</a>
                    </p>
                    <p className="email">
                      <a href="mailto:help@greatflorida.com"><i className="fa fa-envelope" />help@greatflorida.com</a>
                    </p>
                  </div>
                </div>

              </div>
            </section>
          </div>
        </div>
      </div>
    </PolicyConnect>
  );
};

PolicyholderAgent.propTypes = {
  policy: PropTypes.shape()
};

const mapStateToProps = state => ({
  policy: handleGetPolicy(state)
});

export default connect(mapStateToProps)(PolicyholderAgent);
