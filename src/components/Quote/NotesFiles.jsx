import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';
import {reduxForm, Form, propTypes} from 'redux-form';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import QuoteBaseConnect from '../../containers/Quote';
import ClearErrorConnect from '../Error/ClearError';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const handleFormSubmit = (data, dispatch, props) => {
    alert('submit');
};

const handleInitialize = (state) => {
    const formValues = {
        textField1: '',
        billTo: 'Mortgagee',
        billPlan: 'Annual',
        textField2: '5000',
        isActive: true,
        deductible: 200000,
        disabled: true
    };
    return formValues;

};


class MySearchPanel extends React.Component {
  render() {
    return (
      <div className="toolbar">
      <div className='input-group'>
        <div className="btn btn-notes">Notes</div>
        <div className="btn btn-files">Files</div>
      </div>
      { this.props.searchField }
      </div>
    );
  }
}

var notes = [
  { id: 0, type: 'Agent', attachmentCount: 3, created: '03/20/2017', author: 'REGNA', term: 0, note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', expand: [ { fileList: 'HTML list / data' } ]
}, { id: 1, type: 'Agent', attachmentCount: 2, created: '03/18/2017', author: 'JSUTPHIN', term: 0, note: 'Maecenas egestas, est nec accumsan porta, felis erat facilisis velit, ac bibendum felis est id neque.', expand: [ { fileList: 'HTML list / data' } ]
 }, { id: 2, type: 'Policy Holder', attachmentCount: 1, created: '03/19/2017', author: 'REGNA', term: 0, note: 'Pharetra erat. Maecenas egestas, est nec accumsan porta.', expand: [ { fileList: 'HTML list / data' } ]
  },
  { id: 3, type: 'Policy Holder', attachmentCount: 0, created: '03/19/2017', author: 'REGNA', term: 0, note: 'Hasellus non pharetra erat. Maecenas egestas, est nec accumsan porta, felis erat facilisis velit, ac bibendum felis est id neque.', expand: []
  },
  { id: 4, type: 'Policy Holder', attachmentCount: 7, created: '03/12/2017', author: 'JSUTPHIN', term: 0, note: 'Non pharetra erat. Maecenas egestas, est nec accumsan porta, felis erat facilisis velit, ac bibendum felis est id neque.', expand: [ { fileList: 'HTML list / data' } ]
   },

]

class BSTable extends React.Component {
  render() {
    if (this.props.data) {
      return (
        <BootstrapTable data={ this.props.data }>
          <TableHeaderColumn dataField='fileList' isKey={ true }>Attachment List</TableHeaderColumn>
        </BootstrapTable>);
    } else {
      return (<p>?</p>);
    }
  }
}

class NoteList extends React.Component {

  isExpandableRow(row) {
    if (row.id < 2) return true;
    else return true;
  }

  expandComponent(row) {
    return (
      <BSTable data={ row.expand } />
    );
  }

  render() {
    const options = {
      searchPanel: (props) => (<MySearchPanel { ...props }/>)
    };
    return (
      <BootstrapTable data={ notes }
        options={ options }
        expandableRow={ this.isExpandableRow }
        expandComponent={ this.expandComponent }
        search>
        <TableHeaderColumn dataField='id'isKey hidden>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='type' dataSort={ true } width='15%'>Type</TableHeaderColumn>
        <TableHeaderColumn dataField='attachmentCount' className="attachmentCount" dataSort={ true } dataAlign="center" width='7%'><i className="fa fa-paperclip" aria-hidden="true"></i></TableHeaderColumn>
        <TableHeaderColumn dataField='created' dataSort={ true } width='10%'>Created</TableHeaderColumn>
        <TableHeaderColumn dataField='author' dataSort={ true } width='13%'>Author</TableHeaderColumn>
        <TableHeaderColumn dataField='term' dataSort={ true } dataAlign="center" width='10%'>Term</TableHeaderColumn>
        <TableHeaderColumn dataField='note' dataSort={ true } tdStyle={ { whiteSpace: 'normal' } } width='45%'>Note</TableHeaderColumn>
      </BootstrapTable>

    );
  }
}

var files = [
  {
      id: 0,
      format: "jpg (icon)",
      type: "Adjuster Report",
      fileName: "H03-216037-09-20170304.jpg",
      created: "03/20/2017",
      author: "REGNA"
  }, {
    id: 1,
    format: "pdf (icon)",
    type: "Agent",
    fileName: "H03-546037-33-20170308.pdf",
    created: "03/19/2017",
    author: "JSUTPHIN"
  }, {
    id: 2,
    format: "msg (icon)",
    type: "Loss Notice",
    fileName: "H03-346037-11-20170302.msg",
    created: "03/16/2017",
    author: "REGNA"
  }, {
    id: 3,
    format: "png (icon)",
    type: "Subro Expert Report",
    fileName: "H03-236037-09-20170315.png",
    created: "03/11/2017",
    author: "JSUTPHIN"
  }, {
    id: 4,
    format: "pdf (icon)",
    type: "Loss Notice",
    fileName: "H03-187380-09-20170312.pdf",
    created: "03/09/2017",
    author: "REGNA"
  }, {
    id: 5,
    format: "pdf (icon)",
    type: "Agent",
    fileName: "H03-666037-22-20170302.pdf",
    created: "03/05/2017",
    author: "REGNA"
  }


];

class Files extends React.Component {
  render() {
    const options = {
      searchPanel: (props) => (<MySearchPanel { ...props }/>)
    };
    return (
      <BootstrapTable data={ files } options={ options } search>
        <TableHeaderColumn dataField='id' isKey hidden>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='format' dataSort={ true } width='10%'>Format</TableHeaderColumn>
        <TableHeaderColumn dataField='type' dataSort={ true } width='20%'>Type</TableHeaderColumn>
        <TableHeaderColumn dataField='fileName' dataSort={ true } tdStyle={ { whiteSpace: 'normal' } } width='30%'>File Name</TableHeaderColumn>
        <TableHeaderColumn dataField='created' dataSort={ true } width='15%'>Created</TableHeaderColumn>
        <TableHeaderColumn dataField='author' dataSort={ true } width='15%'>Author</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}



// ------------------------------------------------
// The render is where all the data is being pulled
//  from the props.
// The quote data data comes from the previous task
//  which is createQuote / singleQuote. This might
//  not be the case in later calls, you may need
//  to pull it from another place in the model
// ------------------------------------------------
export const NotesFiles = (props) => {
    const {handleSubmit} = props;
    return (
        <QuoteBaseConnect>
            <ClearErrorConnect/>
            <div className="route-content">
                <Form id="NotesFiles" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
                    <div className="scroll">
                        <div className="form-group survey-wrapper" role="group">
                          <h3>History</h3>
                          <section>
                            <div className="notes-list">
                              <NoteList />
                            </div>
                            <div className="file-list" hidden>
                              <Files />
                            </div>
                          </section>
                        </div>
                    </div>
                </Form>
            </div>
        </QuoteBaseConnect>
    );
};

// ------------------------------------------------
// Property type definitions
// ------------------------------------------------
NotesFiles.propTypes = {
    ...propTypes,
    tasks: PropTypes.shape(),
    appState: PropTypes.shape({
        modelName: PropTypes.string,
        instanceId: PropTypes.string,
        data: PropTypes.shape({submitting: PropTypes.boolean})
    })
};

// ------------------------------------------------
// redux mapping
// ------------------------------------------------
const mapStateToProps = state => ({
    tasks: state.cg,
    appState: state.appState,
    fieldValues: _.get(state.form, 'NotesFiles.values', {}),
    initialValues: handleInitialize(state)
});

const mapDispatchToProps = dispatch => ({
    actions: {
        cgActions: bindActionCreators(cgActions, dispatch),
        appStateActions: bindActionCreators(appStateActions, dispatch)
    }
});

// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'NotesFiles'})(NotesFiles));
