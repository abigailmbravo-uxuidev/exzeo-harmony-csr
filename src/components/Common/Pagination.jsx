import React from 'react';
import { Input } from '@exzeo/core-ui/lib/Input'

const Pagination = ({ changePageBack, changePageForward, pageNumber, totalPages }) => (
  <div className="pagination-wrapper">
    <button
      type="button"
      className="btn multi-input"
      onClick={changePageBack}
      tabIndex="0"
      disabled={String(pageNumber) === '1'}><span className="fa fa-chevron-circle-left" /></button>
    <div className="pagination-count">
      <Input
        input={{ name: 'pageNumber', value: pageNumber }}
        label="Page"
        size="2"
        disabled
      />
      <span className="pagination-operand">of</span>
      <Input
        input={{name: "totalPages", value: totalPages}}
        styleName="totalPages"
        size="2"
        disabled
      />
    </div>
    <button
      onClick={changePageForward}
      disabled={String(pageNumber) === String(totalPages)}
      tabIndex="0"
      className="btn multi-input"
      type="button"
      form="SearchBar"><span className="fa fa-chevron-circle-right" /></button>
  </div>
);

export default Pagination;
