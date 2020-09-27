import React, { useEffect, useState } from "react";
import { channelsNames } from "./channelsNames";
import { ChannelEntry } from "./ChannelEntry";
import { API_KEY } from "./BotAPI";
import "./App.css";

function Channels() {
  let channelsArray: ChannelEntry[] = [];

  for (let channelName of channelsNames) {
    let newChannel: ChannelEntry = {
      title: "",
      link: `https://t.me/${channelName}`,
      description: "",
      pictureID: "",
      subscribers: 0
    };

    getFormalName(channelName).then(r => newChannel.title = r);
    getPictureID(channelName).then(r => newChannel.pictureID = r);

    Promise.all([getFormalName, getPictureID]).then(() => channelsArray.push(newChannel));
  }

  async function getFormalName(channelName: string): Promise<string> {
    const r = await fetch(`https://api.telegram.org/bot${API_KEY}/getChat?chat_id=@${channelName}`);
    const r_1 = await r.json();
    return r_1.result.title;
  }

  async function getPictureID(channelName: string): Promise<string> {
    const r = await fetch(`https://api.telegram.org/bot${API_KEY}/getChat?chat_id=@${channelName}`);
    const r_1 = await r.json();
    return r_1.result.photo.big_file_id;
  }

  function compare(a: ChannelEntry, b: ChannelEntry) {
    if (a.subscribers < b.subscribers) return -1;
    else if (a.subscribers > b.subscribers) return 1;
    return 0;
  }
  channelsArray.sort(compare);
  console.log(channelsArray);

  let key: number = 0;
  return (
    <div>
      {channelsArray.map((channel) => <ul className="channelsList" key={key++}>
        <a className="channelsLinks" href={channel.link}><h1>{channel.title}</h1></a>
      </ul>)}
    </div>
  );
}

function App() {
  return <Channels />
}

export default App;