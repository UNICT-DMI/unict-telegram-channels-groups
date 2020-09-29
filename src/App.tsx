import React, { useEffect, useState } from "react";
import { channelsNames } from "./channelsNames";
import { ChannelEntry } from "./ChannelEntry";
import { API_KEY } from "./BotAPI";
import "./App.css";

function Channels(): any {
  const [channelsArray, updateChannelsArray] = useState<ChannelEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const promises: Promise<any>[] = [];

  useEffect(() => {
    function getData(channelName: string): void {
      let newChannel: ChannelEntry = {
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
          newChannel.pictureID = data.result.photo.big_file_id;
          updateChannelsArray((before) => [...before, newChannel]);
        })
      );
    }

    for (let channel of channelsNames) {
      getData(channel);
    }

    function compare(a: ChannelEntry, b: ChannelEntry): number {
      if (a.subscribers < b.subscribers) return -1;
      else if (a.subscribers > b.subscribers) return 1;
      return 0;
    }

    Promise.all(promises).then(() => {
      channelsArray.sort(compare);
      setLoading(false);
    });
  }, []);

  let key: number = 0;
  return (
    <div>
      {
        loading ?
          <h1 className="loadingText">Loading...</h1> :
          channelsArray.map((channel) =>
            <Card id={key++} title={channel.title} link={channel.link} description={channel.description} picture={channel.pictureID} subscribers={channel.subscribers} />)
      }
    </div>
  );
}

function Card(props: any): any {
  return (
    <ul key={props.id}>
      <div>
        <a className="channelsLinks" href={props.link}><h1>{props.title}</h1></a>
        <h3 className="description">{props.description}</h3>
        <p className="subscribers">Subscribers: {props.subscribers}</p>
      </div>
    </ul>
  );
}

function App(): any {
  return <Channels />
}

export default App;