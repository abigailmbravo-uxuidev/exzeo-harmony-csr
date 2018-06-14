import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Form } from 'redux-form';
import CSRFields from './CSRFields';
import ContactFields from './ContactFields';
import PrincipalFields from './PrincipalFields';

export const EditContact = (props) => {
  const {
    toggleModal, updateContact, handleSubmit, pristine, editType
  } = props;
  return (
    <div className="modal contact-crud">
      <Form noValidate onSubmit={handleSubmit(updateContact)}>
        <div className="card">
          <div className="card-header">
            <h4>
              <i className="fa fa-pencil" />&nbsp;Edit {editType}
            </h4>
          </div>
          <div className="card-block">
            {editType === 'CSR' && <CSRFields />}
            {editType === 'Contact' && <ContactFields />}
            {editType === 'Principal' && <PrincipalFields />}
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

EditContact.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  updateContact: PropTypes.func.isRequired
};

export default reduxForm({ form: 'EditContact', enableReinitialize: true })(EditContact);
