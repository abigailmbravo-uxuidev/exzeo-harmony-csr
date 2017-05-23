import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import logo from '../../img/Harmony.svg';
import * as userActions from '../../actions/userActions';

export const QuoteHeader = props => (
  <header>
    <div role="banner">
      <div className="tab-tag">
        <button className="btn-icon btn-bars"><i className="fa fa-bars" /></button>
        <span>QUOTE</span>
      </div>
      <div id="logo" className="logo">
        <img src={logo} alt="Harmony" />
      </div>
      <div className="quote-description"><label>Type</label>{props.appState && props.appState.data && props.appState.data.quote ? `${props.appState.data.quote.product}` : '-'}
        <label>Quote Number</label>{props.appState && props.appState.data && props.appState.data.quote ? `${props.appState.data.quote.quoteNumber}` : '-'}</div>
      <button className="btn-icon btn-ellipsis-v"><i className="fa fa-ellipsis-v" /></button>
      <nav>
        <button className="btn note btn-action" type="button"><i className="fa fa-plus" /> Note/File</button>
        <button className="btn close btn-action" type="button"><i className="fa fa-times" /></button>
      </nav>
    </div>
  </header>
);


QuoteHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  appState: PropTypes.shape({
    instanceId: PropTypes.string,
    modelName: PropTypes.string,
    data: PropTypes.shape({
      quote: PropTypes.object,
      updateWorkflowDetails: PropTypes.boolean,
      hideYoChildren: PropTypes.boolean,
      recalc: PropTypes.boolean
    })
  })
};

const mapStateToProps = state => ({
  user: state.user,
  appState: state.appState
});
const mapDispatchToProps = dispatch => ({
  actions: {
    user: bindActionCreators(userActions, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(QuoteHeader);
