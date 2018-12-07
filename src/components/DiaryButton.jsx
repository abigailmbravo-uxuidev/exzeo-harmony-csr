import React from 'react';
import Button from '@exzeo/core-ui/lib/Button/index';
import PropTypes from 'prop-types';

const DiaryButton = ({ onToggleDiaries, showDiaries, openDiaryCount }) => (
  <div className="header-toggle-wrapper">
    <Button
      onClick={onToggleDiaries}
      baseClass="link"
      customClass=""
      type="button"
      dataTest="diaryButton">
      {showDiaries && (
        <div className="diary-btn-wrapper panel-open" data-test="diary-btn-wrapper">
          <i className="fa fa-bookmark"><span>{openDiaryCount}</span></i>
          <span>
            <i className="fa fa-chevron-circle-right" />Hide
          </span>
        </div>
      )}
      {!showDiaries && (
        <div className="diary-btn-wrapper panel-closed" data-test="diary-btn-wrapper">
          <i className="fa fa-bookmark"><span>{openDiaryCount}</span></i>
          <span>
            <i className="fa fa-chevron-circle-left" />Show
          </span>
        </div>
      )}
    </Button>
  </div>
);

DiaryButton.propTypes = {
  toggleDiaries: PropTypes.func,
  showDiaries: PropTypes.bool
};

export default DiaryButton;
