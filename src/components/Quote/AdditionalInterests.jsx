import React, {PropTypes} from 'react';
import _ from 'lodash';
import QuoteBaseConnect from '../../containers/Quote';
import ClearErrorConnect from '../Error/ClearError';

const AdditionalInterests = () => <QuoteBaseConnect>
  <ClearErrorConnect/>

  <div className="route-content">
    <form id="AdditionalInterests">
      <div className="scroll">
        <div className="form-group survey-wrapper" role="group">
          <h2>Additional Interests</h2>
          <p>To add additional interests ...</p>
          <div className="button-group">
            <button className="btn btn-sm btn-secondary" type="button"> <div><i className="fa fa-plus"/><span>Mortgagee</span></div></button>
            <button className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus"/><span>Lienholder</span></div></button>
            <button className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus"/><span>Additional Insured</span></div></button>
            <button className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus"/><span>Additional Interest</span></div></button>
            <button className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus"/><span>Billpayer</span></div></button>
          </div>
          

          <div className="btn-footer">
            <button className="btn btn-secondary" form="AdditionalInterests">Cancel</button>
            <button className="btn btn-primary" type="submit" form="AdditionalInterests">Update</button>
          </div>
        </div>
      </div>
    </form>
  </div>

</QuoteBaseConnect>;

export default AdditionalInterests;
