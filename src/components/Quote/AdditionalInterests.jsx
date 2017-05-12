import React, {PropTypes} from 'react';
import _ from 'lodash';
import QuoteBaseConnect from '../../containers/Quote';
import ClearErrorConnect from '../Error/ClearError';

const AdditionalInterests = () => <QuoteBaseConnect>
  <ClearErrorConnect/>

  <div className="route-content">
    <form id="AddAdditionalInterestPage">
      <div className="scroll">
        <div className="form-group survey-wrapper" role="group">
          <h2>Additional Interests</h2>
          <div className="button-group">
            <button className="btn btn-sm btn-secondary" type="button"> <div><i className="fa fa-plus"/><span>Mortgagee</span></div></button>
            <button className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus"/><span>Lienholder</span></div></button>
            <button className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus"/><span>Additional Insured</span></div></button>
            <button className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus"/><span>Additional Interest</span></div></button>
            <button className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus"/><span>Billpayer</span></div></button>
          </div>



          <div className="results-wrapper">
            <ul className="results result-cards">
                <li>
                  <a>
                    {/* add className based on type - i.e. mortgagee could have class of mortgagee*/}
                    <div className="card-icon"><i className={`fa fa-circle`} /><label>question.type question.order + 1</label></div>
                    <section><h4>question.name1</h4><p>question.name2</p><p className="address">question.mailingAddress.address1,
                      question.mailingAddress.address2
                      question.mailingAddress.city, question.mailingAddress.state question.mailingAddress.zip</p></section>
                    <i className="fa fa-pencil" />
                  </a>
                </li>
            </ul>
          </div>





          <div className="btn-footer">
            <button className="btn btn-secondary" form="AddAdditionalInterestPage">Cancel</button>
            <button className="btn btn-primary" type="submit" form="AddAdditionalInterestPage">Update</button>
          </div>
        </div>
      </div>
    </form>
  </div>

</QuoteBaseConnect>;

export default AdditionalInterests;
