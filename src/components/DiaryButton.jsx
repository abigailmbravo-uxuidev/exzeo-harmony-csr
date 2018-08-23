import React from 'react';
import Button from '@exzeo/core-ui/lib/Button/index';
import PropTypes from 'prop-types';

const DiaryButton = ({ toggleDiaries, showDiaries }) => (
  <div className="tab-tag">
    <span>Open Diaries</span>
    <Button
      onClick={toggleDiaries}
      baseClass="primary"
      type="button"
      dataTest="diaryButton">
      { showDiaries && <span><i className="fa fa-arrow-circle-right" />Hide</span>}
      { !showDiaries && <span><i className="fa fa-arrow-circle-left" />Show</span>}
    </Button>
  </div>
);

DiaryButton.propTypes = {
  toggleDiaries: PropTypes.func,
  showDiaries: PropTypes.bool
};

export default DiaryButton;
