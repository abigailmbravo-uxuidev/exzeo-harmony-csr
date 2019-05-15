import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@exzeo/core-ui';
import classNames from 'classnames';

export class SmallModal extends Component {
  render() {
    const {
      modalClassName,
      disabled,
      handleCancel,
      handleSubmit,
      header,
      headerIcon,
      text
    } = this.props;

    return (
      <div className={classNames('modal', modalClassName)}>
          <div className="card">
            <div className="card-header">
              <h4><i className={classNames('fa', headerIcon)} /> {header}</h4>
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
                  className={Button.constants.classNames.secondary}
                  dataTest="modal-cancel"
                  onClick={handleCancel}>No
                </Button>
                <Button
                  className={Button.constants.classNames.primary}
                  dataTest="modal-submit"
                  onClick={handleSubmit}
                  disabled={disabled}>Yes
                </Button>
              </div>
            </div>
          </div>
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
