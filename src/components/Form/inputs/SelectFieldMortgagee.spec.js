import React from 'react';
import { shallow } from 'enzyme';
import { SelectFieldMortgagee } from './SelectFieldMortgagee';

function wrapWithContext(context, contextTypes, children) {
  const wrapperWithContext = React.createClass({ //eslint-disable-line
    childContextTypes: contextTypes,
    getChildContext() { return context; },
    render() { return React.createElement('div', null, children); }
  });

  return React.createElement(wrapperWithContext);
}
describe('SelectFieldMortgagee', () => {
  it('should render "select input" when nothing is provided', () => {
    const context = { router: {} };
    const contextTypes = { router: React.PropTypes.object };
    const wrapper = wrapWithContext(context, contextTypes, <SelectFieldMortgagee />, React);
    expect(shallow(wrapper).find('option').length).toEqual(0);
  });

  it('should render "select input" with answers when answers are provided', () => {
    const inputProps = {
      answers: [
        { AIName1: "AMERICA'S SERVICING", AIName2: 'COMPANY, ISAOA', AIAddress1: 'PO BOX 5106', AICity: 'SPRINGFIELD', AIState: 'OH', AIZip: 45501, AICountry: 'NULL', ID: 1 },
        { AIName1: 'BANK OF AMERICA, NA', AIName2: 'ISAOA/ATIMA', AIAddress1: 'PO BOX 961291', AICity: 'FORT WORTH', AIState: 'TX', AIZip: 76161, AICountry: 'NULL', ID: 2 },
        { AIName1: 'BANK OF AMERICA, NA', AIName2: 'ISAOA/ATIMA', AIAddress1: 'PO BOX 5954', AICity: 'SPRINGFIELD', AIState: 'OH', AIZip: 45501, AICountry: 'NULL', ID: 3 }]
    };
    const context = { router: {} };
    const contextTypes = { router: React.PropTypes.object };
    const wrapper = wrapWithContext(context, contextTypes, <SelectFieldMortgagee {...inputProps} />, React);
    expect(shallow(wrapper).children().props().answers.length).toEqual(3);
    expect(shallow(wrapper).children().props().answers[0].AIName1).toEqual('AMERICA\'S SERVICING');
  });
});
