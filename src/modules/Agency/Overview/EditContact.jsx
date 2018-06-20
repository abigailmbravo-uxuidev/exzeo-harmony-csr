import React from 'react';
import { reduxForm, Form } from 'redux-form';
import { connect } from 'react-redux';
import { updateAgency } from '../../../state/actions/agencyActions';
import { getEditModalInitialValues } from '../../../state/selectors/agency.selector';
import CSR from './CSRFields';
import Contact from './ContactFields';
import Principal from './PrincipalFields';

export const saveAgency = async (data, dispatch, props) => {
  await props.updateAgency(data);
  props.toggleModal()();
};

export const EditContact = (props) => {
  const {
    toggleModal, handleSubmit, pristine, editType
  } = props;
  return (
    <div className="modal contact-crud">
      <Form noValidate onSubmit={handleSubmit(saveAgency)}>
        <div className="card">
          <div className="card-header">
            <h4>
              <i className="fa fa-pencil" />&nbsp;Edit {editType}
            </h4>
          </div>
          <div className="card-block">
            {editType === 'CSR' && <CSR />}
            {editType === 'Contact' && <Contact />}
            {editType === 'Principal' && <Principal />}
          </div>
          <div className="card-footer">
            <div className="btn-footer">
              <button
                tabIndex="0"
                className="btn btn-secondary"
                type="button"
                onClick={toggleModal()}
              >
                Cancel
              </button>
              <button
                tabIndex="0"
                className="btn btn-primary"
                type="submit"
                disabled={pristine}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

const mapStateToProps = state => ({
  initialValues: getEditModalInitialValues(state)
});

export default connect(mapStateToProps, { updateAgency })(reduxForm({
  form: 'EditContact',
  enableReinitialize: true
})(EditContact));

