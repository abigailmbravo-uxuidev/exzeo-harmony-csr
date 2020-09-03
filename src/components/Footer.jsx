import React from 'react';

const Footer = () => (
  <footer>
    <div role="banner">
      <small className="copyright">
        &copy;{new Date().getFullYear()} TypTap Management Company. All rights
        reserved.
      </small>
      <small>v.{process.env.REACT_APP_VERSION}</small>
    </div>
  </footer>
);

export default Footer;
