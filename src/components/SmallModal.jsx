import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@exzeo/core-ui';

export class SmallModal extends Component {
  render() {
    const {
      modalClassName,
      disabled,
      handleCancel,
      handleSubmit,
      submitting,
      header,
      headerIcon,
      text
    } = this.props;

    return (
      <div className={`modal ${modalClassName}`}>
         <form onSubmit={handleSubmit}>
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
                  onClick={handleCancel}>No
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

SmallModal.propTypes = {
  modalClassName: PropTypes.string,
  disabled: PropTypes.bool,
  handleCancel: PropTypes.func,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  header: PropTypes.string,
  headerIcon: PropTypes.string,
  text: PropTypes.string
};

export default SmallModal;
