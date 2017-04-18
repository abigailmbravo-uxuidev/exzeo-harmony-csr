import React from 'react';
import renderer from 'react-test-renderer';
import Loader from './Loader';

it('renders without crashing', () => {
  const tree = renderer.create(
    <Loader />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
