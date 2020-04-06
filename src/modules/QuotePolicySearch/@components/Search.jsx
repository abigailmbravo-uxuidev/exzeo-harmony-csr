import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../../components/Common/Header';
import Footer from '../../../components/Common/Footer';

const Search = ({ handleLogout }) => {
  return (
    <div className="app-wrapper csr">
      <Helmet>
        <title>Harmony - CSR Portal</title>
      </Helmet>
      <Header handleLogout={handleLogout} />
      <div className="search">{/*  Search Bar/Search Form*/}</div>
      <main role="document">
        <div className="content-wrapper">
          <div className="dashboard" role="article">
            <div className="route">
              <div className="search route-content">
                <div className="survey-wrapper scroll">
                  {/* Search Results */}

                  <div className="basic-footer">
                    <Footer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;
