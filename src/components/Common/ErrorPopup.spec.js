import React from 'react';
import renderer from 'react-test-renderer';
import ErrorPopup from './ErrorPopup';


const props = {
  underwritingExceptions: [],
  refereshUWReviewError: () => (false),
  redirectToNewQuote: () => (false),
  quote: {}
};

it('renders without crashing', () => {
  const tree = renderer.create(
    <ErrorPopup {...props} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
