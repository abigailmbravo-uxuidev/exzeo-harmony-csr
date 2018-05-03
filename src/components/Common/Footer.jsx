import React from 'react';
import { version } from '../../../package.json';

const Footer = () =>
  (<footer>
    <div role="banner">
      <small className="copyright">
        &copy;2017 TypTap Management Company. All rights reserved.
      </small>
      <small>
        v.{process.env.REACT_APP_VERSION}
      </small>
    </div>
  </footer>);

export default Footer;
