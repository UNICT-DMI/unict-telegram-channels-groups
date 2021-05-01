import { API } from './Groups';

export const FIRST_YEAR_MASTER: string = 'PRIMO_ANNO_MAGISTRALE';
export const SECOND_YEAR_MASTER: string = 'SECONDO_ANNO_MAGISTRALE';

export async function groupsNames(year: string): Promise<string[]> {
  return fetch(`${API}${year}.json`)
    .then(res => res.json())
    .then(data => data.names as string[])
    .catch(err => {
      console.error(err);
      return [];
    });
}
