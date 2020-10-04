import React, { useEffect, useState } from "react";
import { channelsNames } from "./channelsNames";
import { API_KEY } from "../BotAPI";
import { Link } from "react-router-dom";

interface ChannelEntry {
  title: string;
  link: string;
  description: string;
  pictureURL: string;
  subscribers: number;
}

export function Channels(): JSX.Element {
  const [channelsArray, setChannelsArray] = useState<ChannelEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    const promises: Promise<any>[] = [];
    const promisesPictures: Promise<any>[] = [];
    const promisesSubscribers: Promise<any>[] = [];
    const sortedArray: ChannelEntry[] = [];

    function getData(channelName: string): void {
      const newChannelEntry: ChannelEntry = {
        title: "",
        link: "",
        description: "",
        pictureURL: "",
        subscribers: 0,
      };

      promises.push(
        fetch(
          `https://api.telegram.org/bot${API_KEY}/getChat?chat_id=@${channelName}`
        )
          .then(res => res.json())
          .then(data => {
            newChannelEntry.title = data.result.title;
            newChannelEntry.link = `https://t.me/${channelName}`;
            newChannelEntry.description = data.result.description
              ? data.result.description
              : "";
            promisesPictures.push(
              fetch(
                `https://api.telegram.org/bot${API_KEY}/getFile?file_id=${data.result.photo.big_file_id}`
              )
                .then(res => res.json())
                .then(
                  data =>
                    (newChannelEntry.pictureURL = `https://api.telegram.org/file/bot${API_KEY}/${data.result.file_path}`)
                )
            );
          })
      );

      promisesSubscribers.push(
        fetch(
          `https://api.telegram.org/bot${API_KEY}/getChatMembersCount?chat_id=@${channelName}`
        )
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
        <h1 className="rankingTitle">Classifica canali UNICT</h1>
        <Link to="/groups" className="groupsLink">
          Visualizza Gruppi DMI UNICT
        </Link>
      </div>
      <input
        className="searchInput"
        placeholder="Search..."
        onChange={input => setSearchInput(input.target.value)}
      ></input>
      {loading ? (
        <img src="loading.gif" className="loading" key="loading" alt="loading" />
      ) : (
        <div className="mainContent">
          {channelsArray.map(channel =>
            channel.title.toLowerCase().includes(searchInput.toLowerCase()) ? (
              <div className="cards" key={key++}>
                <Card
                  ranking={key}
                  isSearch={searchInput !== ""}
                  title={channel.title}
                  link={channel.link}
                  description={channel.description}
                  picture={channel.pictureURL}
                  subscribers={channel.subscribers}
                />
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}

function Card(props: any): JSX.Element {
  return (
    <ul className="actualCardsContents">
      <div className="imageAndRanking">
        <a href={props.link}>
          <img
            className="images"
            src={props.picture}
            alt={props.title + " picture"}
          />
        </a>
        <h2 className="rankings">{props.isSearch ? "" : props.ranking + "°"}</h2>
      </div>
      <a className="channelsLinks" href={props.link}>
        <h1>{props.title}</h1>
      </a>
      <p className="descriptions">{props.description}</p>
      <p className="subscribers">Subscribers: {props.subscribers}</p>
    </ul>
  );
}
