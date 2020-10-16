import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Channels } from './Channels';
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup);

test('should take a snapshot', () => {
  const { asFragment } = render(
    <BrowserRouter>
      <Channels />
    </BrowserRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});
