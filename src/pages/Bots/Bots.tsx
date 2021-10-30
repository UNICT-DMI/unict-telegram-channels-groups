import { useEffect, useState } from 'react';
import botsNames from './botsNames';
import BotsCards from '../Cards/BotsCards';

interface BotsProps {
  API: string;
  searchInput: string;
}

interface BotEntry {
  link: string;
  title: string;
  description: string;
  pictureURL: string;
}

const Bots: React.FC<BotsProps> = (props: BotsProps) => {
  const [botsArray, setBotsArray] = useState<BotEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const promises: Promise<void>[] = [];
  const tmpArray: BotEntry[] = [];

  async function getData(botName: string): Promise<void> {
    const newBotEntry: BotEntry = {
      title: '',
      link: '',
      description: '',
      pictureURL: '',
    };

    const request = fetch(`${props.API}mid.php?path=GRUPPI/BOT/${botName}.json`)
      .then((res) => res.json())
      .then((data) => {
        newBotEntry.title = data.group_name as string;
        const tmpLink: string = data.link;
        newBotEntry.link = tmpLink.substring(1, tmpLink.length - 1);
        newBotEntry.description = data.description;
        const tmpPic: string = data.image_link;
        newBotEntry.pictureURL = tmpPic.substring(1);
      });

    await Promise.resolve(request).then(() => {
      tmpArray.push(newBotEntry);
    });
  }

  function compare(a: BotEntry, b: BotEntry): number {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  }

  useEffect(() => {
    (async () => {
      (await botsNames()).forEach((bot) => {
        promises.push(getData(bot));
      });

      return Promise.all(promises);
    })()
      .then(() => {
        tmpArray.sort(compare);
        setBotsArray(tmpArray);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      {loading ? (
        <img src='loading.gif' className='loading' key='loading' alt='loading' />
      ) : (
        <div className='contents-grid'>
          {botsArray.map(
            (bots) =>
              bots.title.toLowerCase().includes(props.searchInput.toLowerCase()) && (
                <BotsCards
                  title={bots.title}
                  link={bots.link}
                  description={bots.description}
                  picture={bots.pictureURL}
                />
              )
          )}
        </div>
      )}
    </div>
  );
};

export default Bots;
