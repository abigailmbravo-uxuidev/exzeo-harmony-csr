import React from 'react';
import moment from 'moment-timezone';
import { date } from '@exzeo/core-ui';

const SendApplicationHO3Script = ({ initialValues }) => {
  return (
    <React.Fragment>
      <p className="script margin bottom">
        I need to confirm a few more items prior to sending the application
      </p>
      <ul>
        <li className="script">
          Do you have a pool or similar structure on the property?
          <ul>
            <li className="script">
              Is it completely fenced, walled, or screened?
            </li>
            <li className="script margin bottom">
              Are there any slides or diving boards?
            </li>
          </ul>
        </li>
        {initialValues.property &&
          (initialValues.property.floodZone === 'A' ||
            initialValues.property.floodZone === 'V') && (
            <li className="script">Do you maintain a separate flood policy?</li>
          )}
        {initialValues.property &&
          (initialValues.property.floodZone === 'A' ||
            initialValues.property.floodZone === 'V') && (
            <li className="scriptInfo margin bottom">
              Home is in flood zone: {initialValues.property.floodZone}
            </li>
          )}
        <li className="script margin bottom">
          Does the property have any existing unrepaired damage?
        </li>
        {initialValues.property &&
          initialValues.property.yearBuilt &&
          initialValues.property.yearBuilt <
            Number(
              date.formatDate(initialValues.effectiveDate, 'YYYY') - 20
            ) && (
            <li className="script">
              What is the roof covering on the home?
              <ul>
                <li className="scriptInfo">
                  Asphalt, Fiberglass, Composition/Wood Shake Shingles, Built-up
                  Tar and Gravel
                </li>
                <li className="script">Is the roof over 20 years old?</li>
                <li className="scriptInfo margin bottom">
                  Before:{' '}
                  {Number(
                    moment
                      .utc(initialValues.effectiveDate)
                      .subtract(20, 'years')
                      .format('YYYY')
                  )}
                </li>
                <li className="scriptInfo">Tile, Slate, Concrete, or Metal</li>
                <li className="script">Is the roof over 40 years old?</li>
                <li className="scriptInfo margin bottom">
                  Before:{' '}
                  {Number(
                    moment
                      .utc(initialValues.effectiveDate)
                      .subtract(40, 'years')
                      .format('YYYY')
                  )}
                </li>
              </ul>
            </li>
          )}
      </ul>
      <hr />
      <p className="scriptInfo">If any adverse information</p>
      <p className="script margin bottom">
        Your policy request will be referred to Underwriting for review.
      </p>
      <p className="scriptInfo margin bottom">
        Click &ldquo;CANCEL&rdquo; below.
      </p>
      <hr />
      <p className="scriptInfo">If no adverse information</p>
    </React.Fragment>
  );
};

export default SendApplicationHO3Script;
