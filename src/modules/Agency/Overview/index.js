import { connect } from 'react-redux';
import OverviewComponent from './Overview';
import { getAgency } from '../../../state/actions/serviceActions';

const mapStateToProps = state => ({
  agency: state.service.agency
});

export default connect(mapStateToProps, { getAgency })(OverviewComponent);
