import { connect } from 'react-redux';

import DiariesSearch from './DiariesSearch';

const mapStateToProps = (state) => {
  return {
    userProfile: state.authState.userProfile
  };
};

export default connect(mapStateToProps)(DiariesSearch);
