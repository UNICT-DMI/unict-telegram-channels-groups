import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  firstYearGroupsNames,
  secondYearGroupsNames,
  thirdYearGroupsNames,
} from './groupsNames';

interface GroupEntry {
  title: string;
  link: string;
  description: string;
  pictureURL: string;
  members: number;
  code: string;
  mzcode: string;
}

export function Groups(): JSX.Element {
  const [groupsArray, setGroupsArray] = useState<GroupEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    const sortedArray: GroupEntry[] = [];
    const promises: Promise<any>[] = [];

    function getData(
      year: string,
      groupName: string,
      code: string,
      mzcode: string
    ): void {
      const newGroupEntry: GroupEntry = {
        title: '',
        link: '',
        description: '',
        pictureURL: '',
        members: 0,
        code: '',
        mzcode: '',
      };

      promises.push(
        fetch(
          `https://seminaraluigi.altervista.org/list-telegram-groups/mid.php?path=${encodeURIComponent(
            year + '/' + groupName
          )}.json`
        )
          .then(res => res.json())
          .then(data => {
            newGroupEntry.title = groupName;
            const tmpLink: string = data.link;
            newGroupEntry.link = tmpLink.substring(1, tmpLink.length - 1);
            newGroupEntry.description = data.description;
            if (data.image_link === '') {
              newGroupEntry.pictureURL = 'telegram.svg';
            } else {
              const tmpPic = data.image_link;
              newGroupEntry.pictureURL = tmpPic.substring(1);
            }
            const tmpMembers: string[] = (data.members_number as string).split(
              ' '
            );
            newGroupEntry.members = parseInt(tmpMembers[0]);
            newGroupEntry.code = code;
            newGroupEntry.mzcode = mzcode;
          })
          .then(() => sortedArray.push(newGroupEntry))
      );
    }

    for (const group of firstYearGroupsNames) {
      getData('PRIMO_ANNO', group.title, group.code, group.mzcode);
    }

    for (const group of secondYearGroupsNames) {
      getData('SECONDO_ANNO', group.title, group.code, group.mzcode);
    }

    for (const group of thirdYearGroupsNames) {
      getData('TERZO_ANNO', group.title, group.code, '');
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
        <Link to="/channels" className="goToChannelsLink">
          Visualizza Canali UNICT
        </Link>
      </div>
      <input
        className="searchInput"
        placeholder="Search..."
        onChange={input => setSearchInput(input.target.value)}></input>
      {loading ? (
        <img
          src="loading.gif"
          className="loading"
          key="loading"
          alt="loading"
        />
      ) : (
        <div className="mainContent">
          {groupsArray.map(
            group =>
              group.title.toLowerCase().includes(searchInput.toLowerCase()) && (
                <div className="cards" key={key++}>
                  <Card
                    ranking={key}
                    isSearch={searchInput !== ''}
                    title={group.title}
                    link={group.link}
                    description={group.description}
                    picture={group.pictureURL}
                    members={group.members}
                    code={group.code}
                    mzcode={group.mzcode}
                  />
                </div>
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
            alt={props.title + ' picture'}
          />
        </a>
        <h2 className="rankings">
          {props.isSearch ? '' : props.ranking + '°'}
        </h2>
      </div>
      <a className="links" href={props.link}>
        <h1>{props.title}</h1>
      </a>
      <p className="descriptions">{props.description}</p>
      <p className="members">Members: {props.members}</p>
      {props.mzcode !== '' ? (
        <div className="codes">
          <p>Codice Teams A-L: <b className="code">{props.code}</b></p>
          <p>Codice Teams M-Z: <b className="code">{props.mzcode}</b></p>
        </div>
      ) : (
        <p className="codes">Codice Teams: <b className="code">{props.code}</b></p>
      )}
    </ul>
  );
}
