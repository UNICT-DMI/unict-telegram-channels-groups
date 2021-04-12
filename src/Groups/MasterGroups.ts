export const FIRST_YEAR_MASTER: string = 'PRIMO_ANNO_MAGISTRALE';
export const SECOND_YEAR_MASTER: string = 'SECONDO_ANNO_MAGISTRALE';
export const API: string =
  'https://seminaraluigi.altervista.org/list-telegram-groups/mid.php?path=GRUPPI/';

export async function groupsNames(year: string): Promise<string[]> {
  return fetch(`${API}${year}.json`)
    .then(res => res.json())
    .then(data => {
      return data.names as string[];
    })
    .catch(err => {
      console.error(err);
      return [];
    });
}
