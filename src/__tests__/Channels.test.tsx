import React from 'react';
import { render, cleanup, RenderResult } from '@testing-library/react';
import { Channels } from '../Channels/Channels';
import { BrowserRouter } from 'react-router-dom';

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
