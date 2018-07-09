import React from 'react';
import PropTypes from 'prop-types';

const AdditionalInterestCard = ({ ai, handleOnEnter, handleClick }) => {
  const { active } = ai;
  return (
    <li key={ai._id} className="card">
      <a style={active ? null : { cursor: 'not-allowed' }} onKeyPress={active ? event => handleOnEnter(event, ai) : null} onClick={active ? () => handleClick(ai) : null}>
        {/* add className based on type - i.e. mortgagee could have class of mortgagee */}
        <div className="card-icon"><i className={`fa fa-circle ${ai.type}`} /><label>{ai.type} {active ? (ai.order + 1) : 'Inactive'}</label></div>

        <section><h4>{ai.name1}&nbsp;{ai.name2} {active ? null : '(Inactive)'}</h4>
          <p className="address">
            {`${ai.mailingAddress.address1},
              ${ai.mailingAddress.address2 ? `${ai.mailingAddress.address2},` : ''} ${ai.mailingAddress.city},
              ${ai.mailingAddress.state}
              ${ai.mailingAddress.zip}`}
          </p>
        </section>
        <div className="ref-number">
          <label htmlFor="ref-number">Reference Number</label>
          <span>{` ${ai.referenceNumber || ' - '}`}</span>
        </div>
        <span className="edit-btn">
          <i className="fa fa-pencil-square" />
          <span>EDIT</span>
        </span>
      </a>
    </li>
  );
};

AdditionalInterestCard.propTypes = {
  ai: PropTypes.object,
  handleOnEnter: PropTypes.func,
  handleOnClick: PropTypes.func
};

AdditionalInterestCard.defaultProps = {};

export default AdditionalInterestCard;
