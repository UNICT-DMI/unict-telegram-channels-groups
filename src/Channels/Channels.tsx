import React, { useEffect, useState } from 'react';
import channelsNames from './channelsNames';
import ChannelsCards from '../Cards/ChannelsCards';
import Menu from '../Menu/Menu';

interface ChannelEntry {
  title: string;
  link: string;
  description: string;
  pictureURL: string;
  subscribers: number;
}

const API: string = 'https://seminaraluigi.altervista.org/list-telegram-groups/api.telegram.php?';

export default function Channels(): JSX.Element {
  const [channelsArray, setChannelsArray] = useState<ChannelEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    const tmpArray: ChannelEntry[] = [];

    async function getData(channelName: string): Promise<void> {
      const newChannelEntry: ChannelEntry = {
        title: '',
        link: '',
        description: '',
        pictureURL: '',
        subscribers: 0,
      };

      const first = fetch(`${API}chat=${channelName}`)
        .then(res => res.json())
        .then(data => {
          newChannelEntry.title = data.result.title;
          newChannelEntry.link = `https://t.me/${channelName}`;
          newChannelEntry.description = data.result.description ? data.result.description : '';
          return fetch(`${API}file=${data.result.photo.big_file_id as string}`);
        })
        .then(res => res.json())
        .then(d => {
          newChannelEntry.pictureURL = `${API}path=${d.result.file_path as string}`;
        });

      const second = fetch(`${API}count=${channelName}`)
        .then(res => res.json())
        .then(data => {
          newChannelEntry.subscribers = data.result;
        });

      await Promise.all([first, second]).then(() => tmpArray.push(newChannelEntry));
    }

    function compare(a: ChannelEntry, b: ChannelEntry): number {
      if (a.subscribers < b.subscribers) return 1;
      if (a.subscribers > b.subscribers) return -1;
      return 0;
    }

    async function initialize() {
      const promises: Promise<void>[] = [];

      channelsNames.forEach(channel => {
        promises.push(getData(channel));
      });

      return Promise.all(promises);
    }

    initialize()
      .then(() => {
        tmpArray.sort(compare);
        setChannelsArray(tmpArray);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <Menu section='channels' setSearchInput={setSearchInput} />
      {loading ? (
        <img src='loading.gif' className='loading' key='loading' alt='loading' />
      ) : (
        <div className='contents-grid'>
          {channelsArray.map(
            (channel, index) =>
              channel.title.toLowerCase().includes(searchInput.toLowerCase()) && (
                <div className='cards' key={channel.title}>
                  <ChannelsCards
                    ranking={index + 1}
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
