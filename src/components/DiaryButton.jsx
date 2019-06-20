import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@exzeo/core-ui';

const DiaryButton = ({ onToggleDiaries, showDiaries, openDiaryCount }) => (
  <div
    className={
      openDiaryCount > 0
        ? 'header-toggle-wrapper active-diaries'
        : 'header-toggle-wrapper'
    }
  >
    <Button
      onClick={onToggleDiaries}
      className={Button.constants.classNames.primary}
      customClass="link"
      type="button"
      dataTest="diaryButton"
    >
      {showDiaries && (
        <div
          className="diary-btn-wrapper panel-open"
          data-test="diary-btn-wrapper"
        >
          <i className="fa fa-bookmark">
            <span>{openDiaryCount}</span>
          </i>
          <span>
            <i className="fa fa-chevron-circle-right" />
            Hide
          </span>
        </div>
      )}
      {!showDiaries && (
        <div
          className="diary-btn-wrapper panel-closed"
          data-test="diary-btn-wrapper"
        >
          <i className="fa fa-bookmark">
            <span>{openDiaryCount}</span>
          </i>
          <span>
            <i className="fa fa-chevron-circle-left" />
            Show
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
