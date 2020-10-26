import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { botsNames } from './botsNames';
import { BotsCards } from '../Cards/BotsCards';

const API: string = 'https://seminaraluigi.altervista.org/list-telegram-groups/BOT/';

interface BotEntry {
  link: string;
  title: string;
  description: string;
  pictureURL: string;
}

export function Bots(): JSX.Element {
  const [botsArray, setBotsArray] = useState<BotEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    let tmpArray: BotEntry[] = [];
    const promises: Promise<any>[] = [];

    function getData(botName: string): void {
      const newBotEntry: BotEntry = {
        title: '',
        link: '',
        description: '',
        pictureURL: '',
      };

      promises.push(
        fetch(API + encodeURIComponent(botName) + '.json')
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

    for (const botName of botsNames) {
      getData(botName);
    }

    Promise.all(promises).then(() => {
      setBotsArray(tmpArray);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="routing">
        <h1 className="ranking-title">Classifica canali UNICT</h1>
        <Link to="/groups" className="link-to-groups">
          Visualizza Gruppi DMI UNICT
        </Link>
      </div>
      <input
        className="search-input-field"
        placeholder="Search..."
        onChange={input => setSearchInput(input.target.value)}></input>
      {loading ? (
        <img src="loading.gif" className="loading" key="loading" alt="loading" />
      ) : (
        <div className="contents-grid">
          {botsArray.map(
            (bots, index) =>
              bots.title.toLowerCase().includes(searchInput.toLowerCase()) && (
                <div className="cards" key={index}>
                  <BotsCards
                    isSearch={searchInput !== ''}
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
