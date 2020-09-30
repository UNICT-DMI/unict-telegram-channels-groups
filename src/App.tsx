import React, { useEffect, useState } from "react";
import { channelsNames } from "./channelsNames";
import { ChannelEntry } from "./ChannelEntry";
import { API_KEY } from "./BotAPI";
import "./App.css";

function Channels(): JSX.Element {
  const [channelsArray, setChannelsArray] = useState<ChannelEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
        subscribers: 0
      };

      promises.push(fetch(`https://api.telegram.org/bot${API_KEY}/getChat?chat_id=@${channelName}`)
        .then(res => res.json())
        .then(data => {
          newChannel.title = data.result.title;
          newChannel.link = `https://t.me/${channelName}`;
          newChannel.description = data.result.description ? data.result.description : "";
          promisesPictures.push(fetch(`https://api.telegram.org/bot${API_KEY}/getFile?file_id=${data.result.photo.big_file_id}`)
            .then(res => res.json())
            .then(data => newChannel.pictureID = `https://api.telegram.org/file/bot${API_KEY}/${data.result.file_path}`)
          )
        })
      );

      promisesMembers.push(fetch(`https://api.telegram.org/bot${API_KEY}/getChatMembersCount?chat_id=@${channelName}`)
        .then(res => res.json())
        .then(data => newChannel.subscribers = data.result)
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
      {
        loading ?
          <h1 className="loadingText">Loading...</h1> :
          channelsArray.map((channel) =>
            <Card key={key++} id={key} title={channel.title} link={channel.link} description={channel.description} picture={channel.pictureID} subscribers={channel.subscribers} />)
      }
    </div>
  );
}

function Card(props: any): JSX.Element {
  return (
    <ul>
      <div>
        <div className="imageAndPosition">
          <a href={props.link}>
            <img src={props.picture} alt={props.title + " picture"} width="200" height="200" />
          </a>
          <p className="position">{props.id}°</p>
        </div>
        <br />
        <a className="channelsLinks" href={props.link}><h1>{props.title}</h1></a>
        <h3 className="description">{props.description}</h3>
        <p className="subscribers">Subscribers: {props.subscribers}</p>
      </div>
    </ul>
  );
}

function App(): JSX.Element {
  return <Channels />
}

export default App;
