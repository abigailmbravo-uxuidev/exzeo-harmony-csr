import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Header from '../components/Common/Header';

const NotFound = function NotFound() {
    return (
        <div className="app-wrapper">
            <Header/>
            <main role="document">
                <div className="route-content">
                    <div className="error-content" role="article">
                        <div className="error-wrapper">
                            <section>
                                <div className="" id="Error">
                                    <div className="detail-wrapper">
                                        <h3 className="section-group-header error"><i className="fa fa-exclamation-triangle"/> 404 Page not found</h3>
                                        <h4 className="error-message">We apologize, but the page you requested was not found.</h4>
                                        <p>Please check the URL for proper spelling. If you are having trouble locating your destination, you can return to the dashboard or contact one of our representatives so they may further assist you</p>
                                        <Link className="btn btn-secondary" to="/">Return to Dashboard</Link>
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
                            </aside>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

NotFound.propTypes = {
    className: PropTypes.string
};

export default NotFound;
