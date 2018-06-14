import { connect } from 'react-redux';
import ContractsComponent from './Contracts';

const mapStateToProps = state => ({
  agency: state.service.agency
});

export default connect(mapStateToProps)(ContractsComponent);
