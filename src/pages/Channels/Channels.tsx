import { useEffect, useState } from 'react';
import channelsNames from './channelsNames';
import ChannelsCards from '../Cards/ChannelsCards';

interface ChannelProps {
  API: string;
  searchInput: string;
}

interface ChannelEntry {
  title: string;
  link: string;
  description: string;
  pictureURL: string;
  subscribers: number;
}

const Channels: React.FC<ChannelProps> = (props: ChannelProps) => {
  const [channelsArray, setChannelsArray] = useState<ChannelEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const promises: Promise<void>[] = [];
  const tmpArray: ChannelEntry[] = [];

  async function getData(channelName: string): Promise<void> {
    const newChannelEntry: ChannelEntry = {
      title: '',
      link: '',
      description: '',
      pictureURL: '',
      subscribers: 0,
    };

    const first = fetch(`${props.API}chat=${channelName}`)
      .then((res) => res.json())
      .then((data) => {
        newChannelEntry.title = data.result.title;
        newChannelEntry.link = `https://t.me/${channelName}`;
        newChannelEntry.description = data.result.description ? data.result.description : '';
        return fetch(`${props.API}file=${data.result.photo.big_file_id as string}`);
      })
      .then((res) => res.json())
      .then((d) => {
        newChannelEntry.pictureURL = `${props.API}path=${d.result.file_path as string}`;
      });

    const second = fetch(`${props.API}count=${channelName}`)
      .then((res) => res.json())
      .then((data) => {
        newChannelEntry.subscribers = data.result;
      });

    await Promise.all([first, second]).then(() => tmpArray.push(newChannelEntry));
  }

  function compare(a: ChannelEntry, b: ChannelEntry): number {
    if (a.subscribers < b.subscribers) return 1;
    if (a.subscribers > b.subscribers) return -1;
    return 0;
  }

  useEffect(() => {
    channelsNames.forEach((channel) => {
      promises.push(getData(channel));
    });

    Promise.all(promises)
      .then(() => {
        tmpArray.sort(compare);
        setChannelsArray(tmpArray);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {loading ? (
        <img src='loading.gif' className='loading' alt='loading' />
      ) : (
        <div className='contents-grid'>
          {channelsArray.map(
            (channel, index) =>
              channel.title.toLowerCase().includes(props.searchInput.toLowerCase()) && (
                <ChannelsCards
                  ranking={index + 1}
                  isSearch={props.searchInput !== ''}
                  title={channel.title}
                  link={channel.link}
                  description={channel.description}
                  picture={channel.pictureURL}
                  subscribers={channel.subscribers}
                />
              )
          )}
        </div>
      )}
    </>
  );
};

export default Channels;
