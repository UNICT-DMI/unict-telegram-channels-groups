import { API } from './Groups';

export const FIRST_YEAR: string = 'PRIMO_ANNO';
export const SECOND_YEAR: string = 'SECONDO_ANNO';
export const THIRD_YEAR: string = 'TERZO_ANNO';

export async function groupsNames(year: string): Promise<string[]> {
  return fetch(`${API}${year}.json`)
    .then(res => res.json())
    .then(data => data.names as string[])
    .catch(err => {
      console.error(err);
      return [];
    });
}
