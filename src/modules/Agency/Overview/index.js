import { connect } from 'react-redux';
import Overview from './Overview';
import { getAgency } from '../../../state/actions/agencyActions';

const mapStateToProps = state => ({
  agency: state.agencyState.agency,
});

export default connect(mapStateToProps, { getAgency })(Overview);
