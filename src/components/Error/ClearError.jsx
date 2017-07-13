import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as errorActions from '../../actions/errorActions';

export class ClearError extends React.Component {
  constructor(props) {
    super(props);
    if (props && props.actions && props.actions.errorActions) {
      props.actions.errorActions.dispatchClearAppError();
    }
  }
  render() {
    return <span />;
  }
}

ClearError.propTypes = {
  actions: PropTypes.shape({
    errorActions: PropTypes.object
  })
};

const mapStateToProps = state => ({
  error: state.error
});

const mapDispatchToProps = dispatch => ({
  actions: {
    errorActions: bindActionCreators(errorActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ClearError);

