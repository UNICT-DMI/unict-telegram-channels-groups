import React, { useEffect, useState } from "react";
import { channelsNames } from "./channelsNames";
import { API_KEY } from "../BotAPI";

interface ChannelEntry {
  title: string;
  link: string;
  description: string;
  pictureID: string;
  subscribers: number;
}

export function Channels(): JSX.Element {
  const [channelsArray, setChannelsArray] = useState<ChannelEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<string>("");
  const promises: Promise<any>[] = [];
  const promisesPictures: Promise<any>[] = [];
  const promisesMembers: Promise<any>[] = [];

  useEffect(() => {
    const sortedArray: ChannelEntry[] = [];

    function getData(channelName: string): void {
      const newChannel: ChannelEntry = {
        title: "",
        link: "",
        description: "",
        pictureID: "",
        subscribers: 0,
      };

      promises.push(
        fetch(
          `https://api.telegram.org/bot${API_KEY}/getChat?chat_id=@${channelName}`
        )
          .then(res => res.json())
          .then(data => {
            newChannel.title = data.result.title;
            newChannel.link = `https://t.me/${channelName}`;
            newChannel.description = data.result.description
              ? data.result.description
              : "";
            promisesPictures.push(
              fetch(
                `https://api.telegram.org/bot${API_KEY}/getFile?file_id=${data.result.photo.big_file_id}`
              )
                .then(res => res.json())
                .then(
                  data =>
                    (newChannel.pictureID = `https://api.telegram.org/file/bot${API_KEY}/${data.result.file_path}`)
                )
            );
          })
      );

      promisesMembers.push(
        fetch(
          `https://api.telegram.org/bot${API_KEY}/getChatMembersCount?chat_id=@${channelName}`
        )
          .then(res => res.json())
          .then(data => (newChannel.subscribers = data.result))
          .then(() => sortedArray.push(newChannel))
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
        Promise.all(promisesMembers).then(() => {
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
      <h1 className="rankingTitle">Classifica canali UNICT</h1>
      <input
        className="searchInput"
        placeholder="Search..."
        onChange={input => setSearchInput(input.target.value)}
      ></input>
      {loading ? (
        <h1 className="loadingText">Loading...</h1>
      ) : (
        <div className="mainContent">
          {channelsArray.map(channel =>
            channel.title.toLowerCase().includes(searchInput.toLowerCase()) ? (
              <div className="cards">
                <Card
                  key={key++}
                  id={key}
                  isSearch={searchInput != ""}
                  title={channel.title}
                  link={channel.link}
                  description={channel.description}
                  picture={channel.pictureID}
                  subscribers={channel.subscribers}
                />
              </div>
            ) : (
              ""
            )
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
        <h2 className="rankings">{props.isSearch ? "" : props.id + "°"}</h2>
      </div>
      <a className="channelsLinks" href={props.link}>
        <h1>{props.title}</h1>
      </a>
      <p className="descriptions">{props.description}</p>
      <p className="subscribers">Subscribers: {props.subscribers}</p>
    </ul>
  );
}
