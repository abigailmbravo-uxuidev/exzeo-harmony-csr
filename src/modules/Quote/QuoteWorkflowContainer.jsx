import { connect } from 'react-redux';
import { getQuoteSelector } from '../../state/selectors/quote.selectors';
import { getEnumsForQuoteWorkflow } from '../../state/actions/list.actions';
import {
  retrieveQuote,
  updateQuote,
  verifyQuote
} from '../../state/actions/quote.actions';
import { setAppError } from '../../state/actions/error.actions';
import { toggleNote } from '../../state/actions/ui.actions';
import { QuoteWorkflow } from './QuoteWorkflow';

const mapStateToProps = state => {
  return {
    quote: getQuoteSelector(state),
    options: state.list,
    isLoading: state.ui.isLoading,
    notes: state.notes,
    notesSynced: state.ui.notesSynced
  };
};

export default connect(mapStateToProps, {
  getEnumsForQuoteWorkflow,
  retrieveQuote,
  setAppError,
  updateQuote,
  verifyQuote,
  toggleNote
})(QuoteWorkflow);
