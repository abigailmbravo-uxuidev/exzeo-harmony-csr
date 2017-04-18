import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import Footer from '../components/Common/Footer';

export const AppError = (props, context) => {
  if (!props.error.message) {
    return <Redirect to={{ pathname: context.router.route.location.state.redirectUrl }} />;
  }
  return (
    <div className="error-wrapper" role="article">
      <div className="fade-in">
        <div className="route">
          <div className="error-content" role="article">
            <div className="fade-in">
              <section>
                <div className="fade-in" id="Error">
                  <div className="detail-wrapper">
                    <div className="waves" />
                    <div className="duckie" />
                    <h3 className="section-group-header error"><i className="fa fa-exclamation-triangle" /> App Error</h3>
                    <div className="header-wrapper">
                      <div>
                        <h4 className="error-message">OH NO! You&lsquo;ve flooded the website!</h4>
                        <p>Just kidding, something has gone wrong. Please go the <Link to="/">Dashboard</Link> and start over.</p>
                      </div>
                    </div>
                    <Link className="btn btn-secondary" to="/">Return to Dashboard</Link>
                  </div>
                </div>
              </section>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

AppError.contextTypes = {
  router: PropTypes.object
};

AppError.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string
  })
};

const mapStateToProps = state => ({
  error: state.error
});

export default connect(mapStateToProps)(AppError);
