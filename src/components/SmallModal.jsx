import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Button } from '@exzeo/core-ui';

export class SmallModal extends Component {
  render() {
    const {
      modalClassName,
      disabled,
      handleCancel,
      handleOnSubmit,
      submitting,
      header,
      headerIcon,
      text
    } = this.props;

    return (
      <div className={`modal ${modalClassName}`}>
         <form onSubmit={handleOnSubmit}>
          <div className="card">
            <div className="card-header">
              <h4><i className={`fa ${headerIcon}`} /> {header}</h4>
            </div>
            <div className="card-block">
              <section>
                <h4 className="textClassName">
                    {text}
                </h4>
              </section>
            </div>
            <div className="card-footer">
              <div className="btn-footer">
                <Button
                  baseClass="secondary"
                  dataTest="modal-cancel"
                  onClick={() => handleCancel()}>No
                </Button>
                <Button
                  baseClass="primary"
                  dataTest="modal-submit"
                  type="submit"
                  disabled={disabled || submitting}>Yes
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
};

SmallModal.defaultProps = {
    headerIcon: 'fa-circle'
}

export default SmallModal;
