import React, {
  Component,
  PropTypes
} from 'react';
import {
  bindActionCreators
} from 'redux';
import {
  connect
} from 'react-redux';

import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';

const workflowDetailsModelName = 'quoteModelGetQuote';

const getQuoteFromModel = (state, props) => {
  const startModelData = {
    _id: (state.quote._id) ? state.quote._id : props.appState.data.quote._id // eslint-disable-line
  };
  props.actions.cgActions.startWorkflow(workflowDetailsModelName, startModelData, false)
    .then(() => {
      props.actions.appStateActions.setAppState(props.appState.modelName,
        props.appState.instanceId, {
          ...props.appState.data,
          updateWorkflowDetails: false
        });
    });
};

export class WorkflowDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.appState !== this.props.appState) {
      if ((nextProps.appState.data.quote || this.state.quote._id) && nextProps.appState.data.updateWorkflowDetails) { // eslint-disable-line
        getQuoteFromModel(this.state, nextProps);
      }
    }
    if (nextProps.tasks[workflowDetailsModelName] !== this.props.tasks[workflowDetailsModelName]) {
      if (nextProps.tasks[workflowDetailsModelName] &&
        nextProps.tasks[workflowDetailsModelName].data.previousTask &&
        nextProps.tasks[workflowDetailsModelName].data.previousTask.name === 'quote') {
        const quote = nextProps.tasks[workflowDetailsModelName].data.previousTask.value.result;
        if (nextProps.appState.data.hideYoChildren) {
          delete quote.coverageLimits;
          delete quote.quoteNumber;
        }
        this.setState((prevProps, newProps) => ({ ...newProps,
          quote
        }));
      }
    }
  }

  render() {
    if (!this.state.quote._id) { // eslint-disable-line
      return <div className="detailHeader" />;
    }
    return (
      <div className="detailHeader">
        <section id="quoteDetails" className="quoteDetails">
          <dl>
            <div>
              <dt className="fade">Quote Number</dt>
              <dd className="fade">{(this.state.quote.quoteNumber ? this.state.quote.quoteNumber : '-')}</dd>
            </div>
          </dl>
        </section>
        <section id="propertyDetails" className="propertyDetails">
          <dl>
            <div>
              <dt>Address</dt>
              <dd className="fade">{this.state.quote.property.physicalAddress.address1}</dd>
              <dd className="fade">{this.state.quote.property.physicalAddress.address2}</dd>
              <dd className="fade">
                {this.state.quote.property.physicalAddress.city},&nbsp;
                {this.state.quote.property.physicalAddress.state}&nbsp;
                {this.state.quote.property.physicalAddress.zip}
              </dd>
            </div>
          </dl>
        </section>
        <section id="yearBuilt" className="yearBuilt">
          <dl>
            <div>
              <dt className="fade">Year Built</dt>
              <dd className="fade">{this.state.quote.property.yearBuilt}</dd>
            </div>
          </dl>
        </section>
        <section id="coverageDetails" className="coverageDetails">
          <dl>
            <div>
              <dt className="fade">Coverage A</dt>
              <dd className="fade">
                $ {this.state.quote.coverageLimits && !this.props.appState.data.recalc && !this.props.appState.data.updateWorkflowDetails ?
                this.state.quote.coverageLimits.dwelling.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '-'}
              </dd>
            </div>
          </dl>
        </section>
        <section id="premium" className="premium">
          <dl>
            <div>
              <dt className="fade">Premium</dt>
              <dd className="fade">
                $ {this.state.quote.rating && !this.props.appState.data.recalc && !this.props.appState.data.updateWorkflowDetails ?
                this.state.quote.rating.totalPremium.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '--'}
              </dd>
            </div>
          </dl>
        </section>
      </div>
    );
  }
}

WorkflowDetails.propTypes = {
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    data: PropTypes.shape({
      quote: PropTypes.object,
      updateWorkflowDetails: PropTypes.boolean,
      hideYoChildren: PropTypes.boolean,
      recalc: PropTypes.boolean
    })
  })
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkflowDetails);
