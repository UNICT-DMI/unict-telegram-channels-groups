import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { channelsNames } from './channelsNames';
import ChannelsCards from '../Cards/ChannelsCards';

interface ChannelEntry {
  title: string;
  link: string;
  description: string;
  pictureURL: string;
  subscribers: number;
}

const API: string = 'https://seminaraluigi.altervista.org/list-telegram-groups/api.telegram.php?';

export function Channels(): JSX.Element {
  const [channelsArray, setChannelsArray] = useState<ChannelEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    const promises: Promise<any>[] = [];
    const promisesPictures: Promise<any>[] = [];
    const promisesSubscribers: Promise<any>[] = [];
    const sortedArray: ChannelEntry[] = [];

    function getData(channelName: string): void {
      const newChannelEntry: ChannelEntry = {
        title: '',
        link: '',
        description: '',
        pictureURL: '',
        subscribers: 0,
      };

      promises.push(
        fetch(`${API}chat=${channelName}`)
          .then(res => res.json())
          .then(data => {
            newChannelEntry.title = data.result.title;
            newChannelEntry.link = `https://t.me/${channelName}`;
            newChannelEntry.description = data.result.description ? data.result.description : '';
            promisesPictures.push(
              fetch(`${API}file=${data.result.photo.big_file_id}`)
                .then(res => res.json())
                .then(d => (newChannelEntry.pictureURL = `${API}path=${d.result.file_path}`))
            );
          })
      );

      promisesSubscribers.push(
        fetch(`${API}count=${channelName}`)
          .then(res => res.json())
          .then(data => (newChannelEntry.subscribers = data.result))
          .then(() => sortedArray.push(newChannelEntry))
      );
    }

    for (const channel of channelsNames) {
      getData(channel);
    }

    function compare(a: ChannelEntry, b: ChannelEntry): number {
      if (a.subscribers < b.subscribers) return 1;
      else if (a.subscribers > b.subscribers) return -1;
      return 0;
    }

    Promise.all(promises).then(() =>
      Promise.all(promisesPictures).then(() =>
        Promise.all(promisesSubscribers).then(() => {
          sortedArray.sort(compare);
          setChannelsArray(sortedArray);
          setLoading(false);
        })
      )
    );
  }, []);

  let key: number = 0;
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
          {channelsArray.map(
            channel =>
              channel.title.toLowerCase().includes(searchInput.toLowerCase()) && (
                <div className="cards" key={key++}>
                  <ChannelsCards
                    ranking={key}
                    isSearch={searchInput !== ''}
                    title={channel.title}
                    link={channel.link}
                    description={channel.description}
                    picture={channel.pictureURL}
                    subscribers={channel.subscribers}
                  />
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}
