import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';

export class Reports extends Component {
  render() {
    return (
      <div className="app-wrapper reports">
        <Header {...this.props} />
        <Helmet>
          <title>Harmony - CSR Reports</title>
        </Helmet>
        <main role="document">
          <div className="content-wrapper">
            <div className="route-content">
              <div className="scroll">
                <div className="form-group survey-wrapper" role="group">
                  <h3>Reports</h3>
                  <ul>
                    <li>
                      <a
                        href="http://hci-mongodw/ReportServer/Pages/ReportViewer.aspx?%2fHarmony%2fQuote%2fQuotes&rs:Command=Render"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Quotes by Created Date
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://hci-mongodw/ReportServer/Pages/ReportViewer.aspx?%2fHarmony%2fQuote%2fPolicy&rs:Command=Render"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Policies by Created Date
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
        <div className="basic-footer">
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authState.userProfile
});

export default connect(mapStateToProps)(Reports);
