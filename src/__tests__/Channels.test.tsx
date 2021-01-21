import React from 'react';
import { render, cleanup, RenderResult } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Channels from '../Channels/Channels';

afterEach(cleanup);

test('Channels snapshot', () => {
  const { asFragment }: RenderResult = render(
    <BrowserRouter>
      <Channels />
    </BrowserRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});
