import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';

const NotFound = function NotFound() {
    return (
        <div className="app-wrapper">
            <Header />
            <div className="error-wrapper" role="article">
                <main role="document">
                    <section className="error-content">
                        <div className="" id="Error">
                            <div className="detail-wrapper">
                                <h3 className="section-group-header error"><i className="fa fa-exclamation-triangle"/> 404 Page not found</h3>

                                    <div className="scroll">
                                        <h4 className="error-message">We apologize, but the page you requested was not found.</h4>
                                        <p>Please check the URL for proper spelling. If you are having trouble locating your destination, you can return to the dashboard or contact one of our representatives so they may further assist you</p>
                                        <Link className="btn btn-secondary" to="/">Return to Dashboard</Link>
                                    </div>

                            </div>
                        </div>
                        <Footer/>
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
                </main>
            </div>
        </div>
    );
};

NotFound.propTypes = {
    className: PropTypes.string
};

export default NotFound;
