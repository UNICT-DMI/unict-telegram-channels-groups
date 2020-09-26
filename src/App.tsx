import React, { useEffect, useState } from "react";
import { channelsNames } from "./channelsNames";
import { ChannelEntry } from "./ChannelEntry";
import { API_KEY } from "./BotAPI";
import "./App.css";

let channels: ChannelEntry[] = [];

function populateChannelsArray(): void {
  // Function responsible of correctly initialize above "channels" array
  for (let channelName of channelsNames) {
    let newChannel: ChannelEntry = {
      title: "",
      link: "",
      description: "",
      pictureID: "",
      subscribers: 0
    };

    newChannel.title = channelName;
    //getFormalName(channelName).then(r => newChannel.title = r);
    newChannel.link = `https://t.me/${channelName}`;
    //getPictureID(channelName).then(r => newChannel.pictureID = r);

    channels.push(newChannel);
  }

  function getFormalName(channelName: string): Promise<string> {
    return fetch(`https://api.telegram.org/bot${API_KEY}/getChat?chat_id=@${channelName}`)
      .then(r => r.json())
      .then((r) => { return r.result.title; })
  }

  function getPictureID(channelName: string): Promise<string> {
    return fetch(`https://api.telegram.org/bot${API_KEY}/getChat?chat_id=@${channelName}`)
      .then(r => r.json())
      .then((r) => { return r.result.photo.big_file_id; })
  }
}

function compare(a: ChannelEntry, b: ChannelEntry) {
  if (a.subscribers < b.subscribers) return -1;
  else if (a.subscribers > b.subscribers) return 1;
  return 0;
}

function RenderChannels() {
  channels.sort(compare);
  let key: number = 0;

  return (
    <div>
      {channels.map((channel) => <ul className="channelsList" key={key++}>
        <a className="channelsLinks" href={channel.link}><h1>{channel.title}</h1></a>
      </ul>)}
    </div>
  );
}

function App() {
  populateChannelsArray();
  return (
    <RenderChannels />
  );
}

export default App;