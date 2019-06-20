import React from 'react';
import { Input } from '@exzeo/core-ui';

function Pagination({
  changePageBack,
  changePageForward,
  pageNumber,
  totalPages
}) {
  return (
    <div className="pagination-wrapper">
      <button
        type="button"
        className="btn multi-input"
        data-test="page-back"
        onClick={changePageBack}
        tabIndex="0"
        disabled={String(pageNumber) === '1'}
      >
        <span className="fa fa-chevron-circle-left" />
      </button>
      <div className="pagination-count">
        <Input
          input={{ name: 'pageNumber', value: pageNumber }}
          label="Page"
          styleName="pageNumber"
          size="2"
          disabled
          dataTest="pageNumber"
        />
        <span className="pagination-operand">of</span>
        <Input
          input={{ name: 'totalPages', value: totalPages }}
          styleName="totalPages"
          size="2"
          disabled
          dataTest="totalPages"
        />
      </div>
      <button
        type="button"
        className="btn multi-input"
        data-test="page-forward"
        onClick={changePageForward}
        tabIndex="0"
        disabled={String(pageNumber) === String(totalPages)}
      >
        <span className="fa fa-chevron-circle-right" />
      </button>
    </div>
  );
}

export default Pagination;
