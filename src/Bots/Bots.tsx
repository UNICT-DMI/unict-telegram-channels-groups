import React, { useEffect, useState } from 'react';
import botsNames from './botsNames';
import BotsCards from '../Cards/BotsCards';
import Menu from '../Menu/Menu';

const API: string = 'https://seminaraluigi.altervista.org/list-telegram-groups/mid.php?path=';

interface BotEntry {
  link: string;
  title: string;
  description: string;
  pictureURL: string;
}

export default function Bots(): JSX.Element {
  const [botsArray, setBotsArray] = useState<BotEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    const tmpArray: BotEntry[] = [];
    const promises: Promise<void | Response>[] = [];

    function getData(botName: string): void {
      const newBotEntry: BotEntry = {
        title: '',
        link: '',
        description: '',
        pictureURL: '',
      };

      promises.push(
        fetch(`${API}BOT/${encodeURIComponent(botName)}.json`)
          .then(res => res.json())
          .then(data => {
            newBotEntry.title = data.group_name;
            const tmpLink: string = data.link;
            newBotEntry.link = tmpLink.substring(1, tmpLink.length - 1);
            newBotEntry.description = data.description;
            const tmpPic = data.image_link;
            newBotEntry.pictureURL = tmpPic.substring(1);

            tmpArray.push(newBotEntry);
          })
      );
    }

    botsNames.forEach(botName => {
      getData(botName);
    });

    function compare(a: BotEntry, b: BotEntry): number {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    }

    Promise.all(promises).then(() => {
      tmpArray.sort(compare);
      setBotsArray(tmpArray);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <Menu section='bots' setSearchInput={setSearchInput} />
      {loading ? (
        <img src='loading.gif' className='loading' key='loading' alt='loading' />
      ) : (
        <div className='contents-grid'>
          {botsArray.map(
            bots =>
              bots.title.toLowerCase().includes(searchInput.toLowerCase()) && (
                <div className='cards' key={bots.title}>
                  <BotsCards
                    title={bots.title}
                    link={bots.link}
                    description={bots.description}
                    picture={bots.pictureURL}
                  />
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}
