import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom/extend-expect';
import { API } from '../Groups/Groups';
import { FIRST_YEAR, SECOND_YEAR, THIRD_YEAR, groupsNames } from '../Groups/BachelorGroups';
import Bachelor from '../Groups/Bachelor';

describe('Testing Bachelor groups', () => {
  test('Snapshot of Bachelor groups', () => {
    const { asFragment } = render(<Bachelor />);
    expect(asFragment()).toMatchSnapshot();
  });

  const server = setupServer(
    ...[
      rest.get(`${API}${FIRST_YEAR}/GROUP_NAME.json`, (req, res, ctx) =>
        res(
          ctx.json({
            title: '',
            link: '',
            description: '',
            pictureURL: '',
            members: 0,
            code: '',
            mzcode: '',
          })
        )
      ),
    ]
  );

  describe('Bachelor', () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test('wait http request', () => {
      const { getByText } = render(
        <BrowserRouter>
          <Bachelor />
        </BrowserRouter>
      );
      waitFor(() => getByText(/test/i)).catch(e => console.log(e));
    });
  });
});
