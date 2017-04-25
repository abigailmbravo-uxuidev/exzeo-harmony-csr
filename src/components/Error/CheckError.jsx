import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

export const CheckError = (props) => {
  // check the errors
  if (props.error && props.error.message) {
    const errorPath = '/error';
    return <Redirect to={{ pathname: errorPath, state: { redirectUrl: props.redirectUrl } }} />;
  }

  return <span />;
};

CheckError.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string
  }),
  redirectUrl: PropTypes.string
};

const mapStateToProps = state => ({
  error: state.error
});

export default connect(mapStateToProps)(CheckError);
