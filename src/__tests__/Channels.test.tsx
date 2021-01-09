import React from 'react';
import { render, cleanup, RenderResult } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Channels from '../Channels/Channels';

afterEach(cleanup);

test('should take a snapshot', () => {
  const { asFragment }: RenderResult = render(
    <BrowserRouter>
      <Channels />
    </BrowserRouter>
  );

  const firstRender = asFragment();

  expect(firstRender).toMatchSnapshot();
});
