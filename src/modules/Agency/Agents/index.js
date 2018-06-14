import { connect } from 'react-redux';
import AgentsComponent from './Agents';

const mapStateToProps = state => ({
  agency: state.service.agency
});

export default connect(mapStateToProps)(AgentsComponent);
