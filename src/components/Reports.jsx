import React from 'react';
import { Helmet } from 'react-helmet';
import Header from './Header';
import Footer from './Footer';
import MainNavigation from './MainNavigation';

const Reports = () => {
  return (
    <div className="app-wrapper reports">
      <Header>
        <MainNavigation />
      </Header>
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
};

export default Reports;
