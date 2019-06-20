import React, { Component } from 'react';

export class ConfirmPopup extends Component {
  constructor(props) {
    super(props);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    this.state = {
      hidden: false
    };
  }

  componentWillReceiveProps() {
    this.setState({ hidden: false });
  }

  handleConfirm() {
    this.props.setBackStep(true, this.props.callback);
    this.setState({ hidden: true });
  }

  handleCancel() {
    this.props.setBackStep(false, this.props.callback);
    this.setState({ hidden: true });
  }

  render() {
    if (this.state.hidden) {
      return null;
    }
    return (
      <div className="modal unsaved-changes">
        <div className="card unsaved-changes">
          <div className="card-header">
            <h4>
              <i className="fa fa-exclamation-circle" /> Unsaved Changes
            </h4>
          </div>
          <div className="card-block">
            <h3>{this.props.message}</h3>
          </div>
          <div className="card-footer">
            <div className="btn-footer">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={this.handleConfirm}
              >
                Yes
              </button>
              <button
                tabIndex="0"
                className="btn btn-secondary"
                type="button"
                onClick={this.handleCancel}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmPopup;
