import { connect } from 'react-redux';
import 'react-tagsinput/react-tagsinput.css'; // eslint-disable-line

import { getAgentsList, } from '../../../state/selectors/agency.selector';

import Transfer from './TransferModal';

const mapStateToProps = state => ({
  agency: state.agencyState.agency,
  agentsList: getAgentsList(state)
});

export default connect(mapStateToProps, {})(Transfer);
