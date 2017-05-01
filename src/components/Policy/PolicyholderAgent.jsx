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
            <section className="card primary-policyholder">
                    <div className="card-block">
                    <div><i className="fa fa-address-card-o" /> Primary Policyholder</div>
                    <h3>Leroy Jenkins</h3>
                    <p>5085 EAST WALDORF DR., TAMPA, FL 33333, USA</p>
                    <div>
                            <h5><i className="fa fa-phone" /> <a href="tel: 9417777775">(941) 777-7777</a></h5>
                            <p><i className="fa fa-phone" /> <a href="tel: 9417777775">(941) 777-7775</a></p>
                            <p><i className="fa fa-envelope" /> <a href="mailto: leroy.jenkins@yahoo.com">leroy.jenkins@yahoo.com</a></p>
                    </div>
                    </div>
            </section>

            <section className="card secondary-policyholder">
                    <div className="card-block">
                    <div><i className="fa fa-address-card-o" /><span>Secondary Policyholder</span></div>
                    <h4>Susan Jenkins</h4>
                    <p>5085 EAST WALDORF DR., TAMPA, FL 33333, USA</p>
                    </div>
            </section>

            <section className="card agency">
                    <div className="card-block">
                    <div><i className="fa fa-address-book" /><span>Agency</span></div>
                    <h4><a href="">13428</a> GREAT FLORIDA INS - PT CHARLOTTE | ALTERNATE NAME HERE</h4>
                    <p>2762 Tamiami Trl Unit A, Port Charlotte, FL 33952</p>
                    </div>
            </section>

            <section className="card agent">
                    <div className="card-block">
                    <div><i className="fa fa-address-card" /><span>Agency</span></div>
                    <h4><a href="">46129</a> LAURIE CYR</h4>
                    <p>2762 Tamiami Trl Unit A, Port Charlotte, FL 33952</p>
                    </div>
            </section>

          </div>
        </div>
      </div>
    </PolicyConnect>
  );
};

export default PolicyholderAgent;
