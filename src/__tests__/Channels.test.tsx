import React from 'react';
import { render } from '@testing-library/react';
import Channels from '../Channels/Channels';

describe('Testing Channels', () => {
  test('Snapshot of Channels', () => {
    const { asFragment } = render(<Channels />);
    expect(asFragment()).toMatchSnapshot();
  });
});
