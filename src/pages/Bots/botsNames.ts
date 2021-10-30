const API: string =
  'https://seminaraluigi.altervista.org/list-telegram-groups/mid.php?path=GRUPPI/BOT';

export default async function botsNames(): Promise<string[]> {
  return fetch(`${API}.json`)
    .then(res => res.json())
    .then(data => {
      return data.names as string[];
    })
    .catch(err => {
      console.error(err);
      return [];
    });
}
