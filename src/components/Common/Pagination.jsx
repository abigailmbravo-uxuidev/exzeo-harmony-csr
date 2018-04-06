import React from 'react';
import TextField from '../Form/inputs/TextField';

const Pagination = ({ changePageBack, changePageForward, fieldValues }) => (
  <div className="pagination-wrapper">
    <button
      onClick={changePageBack}
      disabled={String(fieldValues.pageNumber) === '1'}
      tabIndex="0"
      className="btn multi-input"
      type="button"
      form="SearchBar"
    >
      <span className="fa fa-chevron-circle-left" />
    </button>
    <div className="pagination-count">
      <TextField size="2" styleName="pageNumber" name="pageNumber" label="Page" disabled />
      <span className="pagination-operand">of</span>
      <TextField size="2" styleName="totalPages" name="totalPages" label="" disabled />
    </div>
    <button
      onClick={changePageForward}
      disabled={String(fieldValues.pageNumber) === String(fieldValues.totalPages)}
      tabIndex="0"
      className="btn multi-input"
      type="button"
      form="SearchBar"
    >
      <span className="fa fa-chevron-circle-right" />
    </button>
  </div>
);

export default Pagination;
