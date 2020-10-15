import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { firstYearGroupsNames, secondYearGroupsNames, thirdYearGroupsNames } from './groupsNames';
import Card from '../Cards/Card';

const API = 'https://seminaraluigi.altervista.org/list-telegram-groups';

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

    function getData(year: string, groupName: string, code: string, mzcode: string): void {
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
        fetch(`${API}/mid.php?path=${encodeURIComponent(year + '/' + groupName)}.json`)
          .then(res => res.json())
          .then(data => {
            const tmpLink: string = data.link;
            newGroupEntry.title = groupName;
            newGroupEntry.link = tmpLink.substring(1, tmpLink.length - 1);
            newGroupEntry.description = data.description;

            if (data.image_link === '') {
              newGroupEntry.pictureURL = 'telegram.svg';
            } else {
              const tmpPic = data.image_link;
              newGroupEntry.pictureURL = tmpPic.substring(1);
            }

            const tmpMembers: string[] = (data.members_number as string).split(' ');
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
        <img src="loading.gif" className="loading" key="loading" alt="loading" />
      ) : (
        <div className="mainContent">
          {groupsArray.map(
            (group, index) =>
              group.title.toLowerCase().includes(searchInput.toLowerCase()) && (
                <div className="cards" key={index++}>
                  <Card
                    ranking={index}
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
