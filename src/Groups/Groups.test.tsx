import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { firstYearGroupsNames, secondYearGroupsNames, thirdYearGroupsNames } from './groupsNames';
import { API, Groups } from './Groups';
import { BrowserRouter } from 'react-router-dom';

/* Mock API */
const server = setupServer(
  ...[
    ...firstYearGroupsNames.map(group =>
      rest.get(
        `${API}/mid.php?path=${encodeURIComponent('PRIMO_ANNO/' + group.title)}.json`,
        (req, res, ctx) =>
          res(
            ctx.json({
              link: 'test1',
              description: 'test1',
              image_link: 'test1',
              members_number: 'test1',
            })
          )
      )
    ),
    ...secondYearGroupsNames.map(group =>
      rest.get(
        `${API}/mid.php?path=${encodeURIComponent('SECONDO_ANNO/' + group.title)}.json`,
        (req, res, ctx) =>
          res(
            ctx.json({
              link: 'test2',
              description: 'test2',
              image_link: 'test2',
              members_number: 'test2',
            })
          )
      )
    ),
    ...thirdYearGroupsNames.map(group =>
      rest.get(
        `${API}/mid.php?path=${encodeURIComponent('TERZO_ANNO/' + group.title)}.json`,
        (req, res, ctx) =>
          res(
            ctx.json({
              link: 'test3',
              description: 'test3',
              image_link: 'test3',
              members_number: 'test3',
            })
          )
      )
    ),
  ]
);

describe('Groups', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('wait http request', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Groups />
      </BrowserRouter>
    );
    waitFor(() => getByText(/test/i));
  });
});
