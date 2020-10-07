import React from 'react';
import { useDiaries } from '../context/diaries-context';

const PlusButton = ({ newNote, document }) => {
  const { diariesDispatch } = useDiaries();
  return (
    <div className="plus-button-group">
      <button
        aria-label="open-btn form-new-diary"
        data-test="new-diary"
        className="btn btn-primary btn-round btn-lg new-diary-btn"
        onClick={() => diariesDispatch({ type: 'makeDiary', document })}
      >
        <i className="fa fa-bookmark" />
        <span>NEW DIARY</span>
      </button>
      <button
        aria-label="open-btn form-new-note"
        data-test="new-note"
        className="btn btn-primary btn-round btn-lg new-note-btn"
        onClick={newNote}
      >
        <i className="fa fa-pencil" />
        <span>NEW NOTE</span>
      </button>
    </div>
  );
};

export default PlusButton;
