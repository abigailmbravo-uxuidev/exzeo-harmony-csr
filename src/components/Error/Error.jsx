import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

const handleGetExceptions = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const exceptions = _.find(taskData.model.variables, { name: taskData.previousTask.name }).value;
  return exceptions;
};

const handleGetQuoteData = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const quoteData = _.find(taskData.model.variables, { name: 'quote' }).value.result;
  return quoteData;
};

const Error = ({ quote, exceptions }) => {
  
    return (
        <div className="app-wrapper">
            <div className="error-content" role="article">
                {/* HARD STOP WORKFLOW ERROR*/}
                <div className="quote-details-error">
                    {quote && <section className="display-element">
                        <dl className="quote-number">
                            <div>
                                <dt>Quote Number</dt>
                                <dd>{quote.quoteNumber}</dd>
                            </div>
                        </dl>
                    </section>
}
                    {quote.property && <section className="display-element">
                        <dl className="property-information">
                            <div>
                                <dt>Property Address</dt>
                                <dd>{quote.property.physicalAddress.address1}</dd>
                                <dd>{quote.property.physicalAddress.address2}</dd>
                                <dd>{`${quote.property.physicalAddress.city}, ${quote.property.physicalAddress.state} ${
                                    quote.property.physicalAddress.zip}`}</dd>
                            </div>
                        </dl>
                    </section>
}
                </div>
                <div className="error-wrapper">
                    <section>
                        <div id="Error">
                            <div className="detail-wrapper">
                                <h3 className="section-group-header error"><i className="fa fa-exclamation-triangle"/>
                                    Please contact us</h3>
                                <h4 className="error-message">Property does not qualify for automated quote</h4>
                                <ul>
                                    {exceptions && exceptions.map((exception, key) => {
                                        if (exception.action === 'Fatal Error') {
                                            return <li key={key}>{exception.agentMessage}</li>;
                                        }
                                        return '';
                                    })
                                    }
                                </ul>
                            </div>
                        </div>
                    </section>
                    <aside>
                        <div className="image"/>
                        <div className="contact-info">
                            <a className="link-email" href="mailto:customerservice@typtap.com"><i className="fa fa-envelope"/>
                                <span>email us</span>
                            </a>
                            <a className="link-phone" href="tel:8442897968"><i className="fa fa-phone"/>
                                <span>(844) 289-7968</span>
                            </a>
                        </div>
                        <div className="waves"/>
                    </aside>
                </div>
            </div>
        </div>
    );
};

Error.propTypes = {
  tasks: PropTypes.shape({
    activeTask: PropTypes.object
  }),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string
  })
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  quote: handleGetQuoteData(state),
  exceptions: handleGetExceptions(state)
});

// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(mapStateToProps, null)(Error);