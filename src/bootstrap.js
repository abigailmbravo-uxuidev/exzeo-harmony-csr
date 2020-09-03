import '../node_modules/font-awesome/scss/font-awesome.scss';
import './sass/base.scss';

const c = document.createComment(
  `Version: ${JSON.stringify(process.env.REACT_APP_VERSION)}`
);
document.body.appendChild(c);
