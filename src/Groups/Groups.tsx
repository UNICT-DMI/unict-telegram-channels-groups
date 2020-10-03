import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  firstYearGroupsNames,
  secondYearGroupsNames,
  thirdYearGroupsNames,
} from "./groupsNames";

interface GroupEntry {
  title: string;
  link: string;
  description: string;
  pictureURL: string;
  members: number;
}

export function Groups(): JSX.Element {
  const [groupsArray, setGroupsArray] = useState<GroupEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<string>("");
  const promises: Promise<any>[] = [];

  useEffect(() => {
    const sortedArray: GroupEntry[] = [];

    function getData(groupName: string, year: string): void {
      const newGroupEntry: GroupEntry = {
        title: "",
        link: "",
        description: "",
        pictureURL: "",
        members: 0,
      };

      promises.push(
        fetch(
          `http://188.213.170.165/list-telegram-groups/${year}/${groupName}.json`
        )
          .then(res => res.json())
          .then(data => {
            newGroupEntry.title = groupName;
            let tmpLink: string = data.link;
            newGroupEntry.link = tmpLink.substring(1, tmpLink.length - 1);
            newGroupEntry.description = data.description;
            if (data.image_link === "") {
              newGroupEntry.pictureURL =
                "https://upload.wikimedia.org/wikipedia/commons/8/83/Telegram_2019_Logo.svg";
            } else {
              let tmpPic = data.image_link;
              newGroupEntry.pictureURL = tmpPic.substring(1);
            }
            let tmpMembers: string[] = (data.members_number as string).split(
              " "
            );
            newGroupEntry.members = parseInt(tmpMembers[0]);
          })
          .then(() => sortedArray.push(newGroupEntry))
      );
    }

    for (const group of firstYearGroupsNames) {
      getData(group, "PRIMO_ANNO");
    }

    for (const group of secondYearGroupsNames) {
      getData(group, "SECONDO_ANNO");
    }

    for (const group of thirdYearGroupsNames) {
      getData(group, "TERZO_ANNO");
    }

    function compare(a: GroupEntry, b: GroupEntry): number {
      if (a.members < b.members) return 1;
      else if (a.members > b.members) return -1;
      return 0;
    }

    Promise.all(promises).then(() => {
      sortedArray.sort(compare);
      setGroupsArray(sortedArray);
      setLoading(false);
    });
  }, []);

  let key: number = 0;
  return (
    <div>
      <div className="routing">
        <h1 className="rankingTitle">Classifica gruppi DMI UNICT</h1>
        <Link to="/UNICT-Telegram-Channels-Groups/channels" className="channelsLink">
          Visualizza Canali UNICT
        </Link>
      </div>
      <input
        className="searchInput"
        placeholder="Search..."
        onChange={input => setSearchInput(input.target.value)}
      ></input>
      {loading ? (
        <h1 className="loadingText">Loading...</h1>
      ) : (
        <div className="mainContent">
          {groupsArray.map(group =>
            group.title.toLowerCase().includes(searchInput.toLowerCase()) ? (
              <div className="cards" key={key++}>
                <Card
                  ranking={key}
                  isSearch={searchInput !== ""}
                  title={group.title}
                  link={group.link}
                  description={group.description}
                  picture={group.pictureURL}
                  subscribers={group.members}
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
        <h2 className="rankings">
          {props.isSearch ? "" : props.ranking + "°"}
        </h2>
      </div>
      <a className="channelsLinks" href={props.link}>
        <h1>{props.title}</h1>
      </a>
      <p className="descriptions">{props.description}</p>
      <p className="subscribers">Subscribers: {props.subscribers}</p>
    </ul>
  );
}
