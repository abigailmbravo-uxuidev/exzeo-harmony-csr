import React, { PropTypes } from 'react';
import { reduxForm, propTypes } from 'redux-form';
import { connect } from 'react-redux';

const NewNoteFileUploader = ({ closeButtonHandler }) => (

    <div className="new-note-file">
        <div className="title-bar">
          <div className="title">Note</div>
          <div className="controls">
              <i className="fa fa-window-minimize" aria-hidden="true"></i>
              &nbsp;&nbsp;&nbsp;
              <button className="btn btn-icon" onClick={closeButtonHandler} type="submit"><i className="fa fa-times-circle" aria-hidden="true"></i></button>
          </div>
        </div>
        <div className="mainContainer">
          <div className="content state-initial">
              <div className="flex-contents">
                <select>
                  <option value="">Select Type</option>
                </select>
                <textarea placeholder="Enter Notes"></textarea>
                <div className="drag-n-drop">
                  Drag and Drop Files
                </div>
              </div>
              <div className="buttons">
                <button className="btn btn-primary">Upload</button>
                <div></div>
                <button className="btn btn-secondary" onClick={closeButtonHandler}>Cancel</button>
                <button className="btn btn-primary">Save</button>
              </div>
          </div>
          <div className="content state-upload" hidden>
            <div className="flex-contents">
              <div className="drag-n-drop">
                Drag and Drop Files
              </div>
            </div>
            <div className="buttons">
              <a href="#" className="btn btn-primary">Choose Files</a>
              <div></div>
              <a href="#" className="btn btn-secondary">Cancel</a>
            </div>
          </div>
          <div className="content state-finalize" hidden>
            <div className="flex-contents">
              <select>
                <option value="">Select Type</option>
              </select>
              <textarea placeholder="Enter Notes"></textarea>
              <div className="drag-n-drop">
                <ul>
                  <li>
                    <span>H031860370920170315.jpg</span>
                    <select>
                      <option>
                        Select Type
                      </option>
                      <option>
                        Select Type
                      </option>
                      <option>
                        Select Type
                      </option>
                      <option>
                        Select Type
                      </option>
                      <option>
                        Select Type
                      </option>
                      <option>
                        Select Type
                      </option>
                      <option>
                        Select Type
                      </option>
                    </select>
                    <i className="fa fa-times-circle" aria-hidden="true"></i>
                  </li>
                  <li>
                    <span>H031860370920170315.jpg</span>
                    <select>
                      <option>
                        Select Type
                      </option>
                    </select>
                    <i className="fa fa-times-circle" aria-hidden="true"></i>
                  </li>

                  <li>
                    <span>H031860370920170315.jpg</span>
                    <select>
                      <option>
                        Select Type
                      </option>
                    </select>
                    <i className="fa fa-times-circle" aria-hidden="true"></i>
                  </li>
                  <li>
                    <span>H031860370920170315.jpg</span>
                    <select>
                      <option>
                        Select Type
                      </option>
                    </select>
                    <i className="fa fa-times-circle" aria-hidden="true"></i>
                  </li>
                  <li>
                    <span>H031860370920170315.jpg</span>
                    <select>
                      <option>
                        Select Type
                      </option>
                    </select>
                    <i className="fa fa-times-circle" aria-hidden="true"></i>
                  </li>
                  <li>
                    <span>H031860370920170315.jpg</span>
                    <select>
                      <option>
                        Select Type
                      </option>
                    </select>
                    <i className="fa fa-times-circle" aria-hidden="true"></i>
                  </li>
                  <li>
                    <span>H031860370920170315.jpg</span>
                    <select>
                      <option>
                        Select Type
                      </option>
                    </select>
                    <i className="fa fa-times-circle" aria-hidden="true"></i>
                  </li>
                </ul>
              </div>
            </div>
            <div className="buttons">
              <a href="#" className="btn btn-primary">Upload</a>
              <div></div>
              <a href="#" className="btn btn-secondary">Cancel</a>
              <a href="#" className="btn btn-primary">Save</a>
            </div>
          </div>
        </div>
</div>

);

NewNoteFileUploader.propTypes = {
  ...propTypes,
  closeButtonHandler: PropTypes.func
};

// ------------------------------------------------
// redux mapping
// ------------------------------------------------
const mapStateToProps = state => ({
  appState: state.appState
});


export default connect(mapStateToProps)(reduxForm({
  form: 'NewNoteFileUploader'
})(NewNoteFileUploader));
