import { connect } from 'react-redux';

import CreateBranch from './CreateBranch';

const mapStateToProps = state => ({
  agency: state.agencyState.agency
});

export default connect(mapStateToProps)(CreateBranch);
