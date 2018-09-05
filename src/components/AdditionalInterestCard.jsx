import React from 'react';
import PropTypes from 'prop-types';

const AdditionalInterestCard = ({ ai, editAI, toggleAIState }) => {
  const { active } = ai;
  return (
    <li key={ai._id}>
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
      {!active &&
        <span className="edit-btn" onClick={() => toggleAIState(ai)}>
          <i className="fa fa-pencil-square" />
          <span>Reactivate</span>
        </span>
      }
      {active &&
        <span className="edit-btn" onClick={() => toggleAIState(ai)}>
          <i className="fa fa-pencil-square" />
          <span>Delete</span>
        </span>
      }
      <span className="edit-btn" onClick={active ? () => editAI(ai) : null}>
        <i className="fa fa-pencil-square" />
        <span>Edit</span>
      </span>
    </li>
  );
};

AdditionalInterestCard.propTypes = {
  ai: PropTypes.object.isRequired,
  editAI: PropTypes.func.isRequired,
  toggleAIState: PropTypes.func.isRequired,
};

AdditionalInterestCard.defaultProps = {};

export default AdditionalInterestCard;
