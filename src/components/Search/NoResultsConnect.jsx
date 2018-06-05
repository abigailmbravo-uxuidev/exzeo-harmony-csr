import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';

export const NoResultsConnect = (props) => {

  /**
  /* Error Message
  */
  if (props.error && props.error.message) {
    return (
      <div className="card">
        <div className="card-header"><h4><i className="fa fa-frown-o " />Error</h4></div>
        <div className="card-block">
          <p>{ error.message }</p>
        </div>
      </div>
    );
  }

  /**
  /* No Message
  */
  if (activeTask.name === 'askToSearchAgain') {
    return (
      <div className="result-cards">
        <div className="card">
          <div className="card-header"><h4><i className="fa fa-frown-o " /> No Results Found</h4></div>
          <div className="card-block">
            {
              (previousTask && previousTask.name === 'searchAddress' ?
                <p>There are no quotes found matching that search criteria. Please try to search again, or start a new quote.</p>
              :
                <p>We&#39;re sorry we couldn&#39;t find any results matching your search parameters. Please
                  check your spelling and try a new search. You can also try a
                  less specific search (such as street number and name).</p>
              )
            }
          </div>
        </div>
      </div>
    );
  }

  return <span />;
};

NoResultsConnect.propTypes = {
  appState: PropTypes.shape({
    modelName: PropTypes.string
  }),
  tasks: PropTypes.shape()
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  error: state.error
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NoResultsConnect);
