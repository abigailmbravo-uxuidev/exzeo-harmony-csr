import { connect } from 'react-redux';
import OverviewComponent from './Overview';

const mapStateToProps = state => ({
  agency: state.service.agency
});

export default connect(mapStateToProps)(OverviewComponent);
