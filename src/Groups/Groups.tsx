import React, { useEffect, useState } from "react";
import { groupsNames } from "./groupsNames";
import { API_KEY } from "../BotAPI";

interface GroupEntry {
  title: string;
  link: string;
  description: string;
  pictureID: string;
  members: number;
}

export function Groups(): JSX.Element {
  const [groupsArray, setGroupsArray] = useState<GroupEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<string>("");
  const promises: Promise<any>[] = [];
  const promisesPictures: Promise<any>[] = [];
  const promisesMembers: Promise<any>[] = [];

  useEffect(() => {
    const sortedArray: GroupEntry[] = [];

    function getData(channelName: string): void {
      const newGroupEntry: GroupEntry = {
        title: "",
        link: "",
        description: "",
        pictureID: "",
        members: 0,
      };

      promises.push(
        fetch(
          `https://api.telegram.org/bot${API_KEY}/getUpdates`
        ).then(res => console.log(res))
      );
    }

    for (const group of groupsNames) {
      getData(group);
    }

    function compare(a: GroupEntry, b: GroupEntry): number {
      if (a.members < b.members) return 1;
      else if (a.members > b.members) return -1;
      return 0;
    }

    Promise.all(promises).then(() =>
      Promise.all(promisesPictures).then(() =>
        Promise.all(promisesMembers).then(() => {
          sortedArray.sort(compare);
          setGroupsArray(sortedArray);
          setLoading(false);
        })
      )
    );
  }, []);

  let key: number = 0;
  return (
    <div>
      <h1 className="rankingTitle">Classifica canali UNICT</h1>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider" />
      </label>
      <input
        className="searchInput"
        placeholder="Search..."
        onChange={input => setSearchInput(input.target.value)}
      ></input>
      {loading ? (
        <h1 className="loadingText">Loading...</h1>
      ) : (
        <div className="mainContent">
          {groupsArray.map(channel =>
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
                  subscribers={channel.members}
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
