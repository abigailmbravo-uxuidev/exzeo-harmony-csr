import React from 'react';
import PolicyConnect from '../../containers/Policy';
import ClearErrorConnect from '../Error/ClearError';

export const PolicyholderAgent = () => {
  return (
    <PolicyConnect>
      <ClearErrorConnect/>
      <div className="route-content">
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            <h1>Policyholder/Agent</h1>
            <section className="primary-policyholder">
              <div className="contact-title"><i className="fa fa-address-card-o"/>&nbsp;Primary Policyholder</div>
              <h3>Leroy Jenkins</h3>
              <h4>5085 EAST WALDORF DR., TAMPA, FL 33333, USA</h4>
              <div className="contact-methods">
                <p className="primary-phone"><i className="fa fa-phone"/>
                  <a href="tel: 9417777777">(941) 777-7777</a>
                </p>
                <p className="secondary-phone"><small>2ND</small><i className="fa fa-phone"/>
                  <a href="tel: 9417777775">(941) 777-7775</a>
                </p>
                <p className="email"><i className="fa fa-envelope"/>
                  <a href="mailto: leroy.jenkins@yahoo.com">leroy.jenkins@yahoo.com</a>
                </p>
              </div>
            </section>

            <section className="secondary-policyholder">
                <div className="contact-title"><i className="fa fa-address-card-o"/>&nbsp;Secondary Policyholder</div>
                <h3>Susan Jenkins</h3>
                <h4>5085 EAST WALDORF DR., TAMPA, FL 33333, USA</h4>
                <div className="contact-methods">
                  <p className="primary-phone"><i className="fa fa-phone"/>
                    <a href="tel: 9417777774">(941) 777-7774</a>
                  </p>
                  <p className="secondary-phone"><small>2ND</small><i className="fa fa-phone"/>
                    <a href="tel: 9417777776">(941) 777-7776</a>
                  </p>
                  <p className="email"><i className="fa fa-envelope"/>
                    <a href="mailto: susan.jenkins@yahoo.com">susan.jenkins@yahoo.com</a>
                  </p>
                </div>
            </section>

            <section className="agency">
                <div className="contact-title"><i className="fa fa-address-book"/>&nbsp;Agency</div>
                <h3>
                  <a href="">13428</a>&nbsp;GREAT FLORIDA INS - PT CHARLOTTE | ALTERNATE NAME HERE</h3>
                <h4>2762 Tamiami Trl Unit A, Port Charlotte, FL 33952</h4>
                <div className="contact-methods">
                  <p className="primary-phone"><i className="fa fa-phone"/>
                    <a href="tel: 9417777755">(941) 777-7755</a>
                  </p>
                  <p className="fax"><i className="fa fa-fax"/>
                    <a href="tel: 9417777722">(941) 777-7722</a>
                  </p>
                  <p className="email"><i className="fa fa-envelope"/>
                    <a href="mailto: help@greatflorida.com">help@greatflorida.com</a>
                  </p>
                  <p className="web"><i className="fa fa-globe"/>
                    <a href="mailto: help@greatflorida.com">help@greatflorida.com</a>
                  </p>
                </div>
            </section>

            <section className="agent">
                <div className="contact-title"><i className="fa fa-address-card"/>&nbsp;Agent</div>
                <h3>
                  <a href="">46129</a>&nbsp;LAURIE CYR</h3>
                <h4>2762 Tamiami Trl Unit A, Port Charlotte, FL 33952</h4>
                <div className="contact-methods">
                  <p className="primary-phone"><i className="fa fa-phone"/>
                    <a href="tel: 9417777755">(941) 777-7755</a>
                  </p>
                  <p className="secondary-phone"><small>2ND</small><i className="fa fa-phone"/>
                    <a href="tel: 9417777333">(941) 777-7333</a>
                  </p>
                  <p className="fax"><i className="fa fa-fax"/>
                    <a href="tel: 9417777722">(941) 777-7722</a>
                  </p>
                  <p className="email"><i className="fa fa-envelope"/>
                    <a href="mailto: laurie.cyr@greatflorida.com">laurie.cyr@greatflorida.com</a>
                  </p>
                  <p className="email"><i className="fa fa-envelope"/>
                    <a href="mailto: help@greatflorida.com">help@greatflorida.com</a>
                  </p>
                </div>
            </section>

          </div>
        </div>
      </div>
    </PolicyConnect>
  );
};

export default PolicyholderAgent;
