import React from 'react';
import { shallow } from 'enzyme';
import SelectFieldMortgagee, {
  SelectInputMortgagee
} from './SelectFieldMortgagee';

describe('SelectFieldMortgagee', () => {
  it('should render "select input" when nothing is provided', () => {
    const wrapper = shallow(<SelectFieldMortgagee name="Test" label="test" />);
    expect(wrapper.find('option').length).toEqual(0);
  });

  it('should render "select input" with answers when answers are provided', () => {
    const inputProps = {
      name: 'Test',
      label: 'test',
      answers: [
        {
          AIName1: "AMERICA'S SERVICING",
          AIName2: 'COMPANY, ISAOA',
          AIAddress1: 'PO BOX 5106',
          AICity: 'SPRINGFIELD',
          AIState: 'OH',
          AIZip: 45501,
          AICountry: 'NULL',
          ID: 1
        },
        {
          AIName1: 'BANK OF AMERICA, NA',
          AIName2: 'ISAOA/ATIMA',
          AIAddress1: 'PO BOX 961291',
          AICity: 'FORT WORTH',
          AIState: 'TX',
          AIZip: 76161,
          AICountry: 'NULL',
          ID: 2
        },
        {
          AIName1: 'BANK OF AMERICA, NA',
          AIName2: 'ISAOA/ATIMA',
          AIAddress1: 'PO BOX 5954',
          AICity: 'SPRINGFIELD',
          AIState: 'OH',
          AIZip: 45501,
          AICountry: 'NULL',
          ID: 3
        }
      ]
    };
    const wrapper = shallow(
      <SelectFieldMortgagee name="test" {...inputProps} />
    );
    expect(wrapper.prop('answers').length).toEqual(3);
    expect(wrapper.prop('answers')[0].AIName1).toEqual("AMERICA'S SERVICING");
  });

  it('should render SelectInputMortgagee', () => {
    const wrapper = shallow(
      <SelectInputMortgagee meta={{}} name="Test" label="test" />
    );
    expect(wrapper.find('option').length).toEqual(0);
  });
});
