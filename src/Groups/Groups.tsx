import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { firstYearGroupsNames, secondYearGroupsNames, thirdYearGroupsNames } from './groupsNames';
import GroupsCards from '../Cards/GroupsCards';

export const API: string = 'https://seminaraluigi.altervista.org/list-telegram-groups';

const primo: string = 'PRIMO_ANNO';
const secondo: string = 'SECONDO_ANNO';
const terzo: string = 'TERZO_ANNO';

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
  const [firstYearGroupsArray, setFirstYearGroupsArray] = useState<GroupEntry[]>([]);
  const [secondYearGroupsArray, setSecondYearGroupsArray] = useState<GroupEntry[]>([]);
  const [thirdYearGroupsArray, setThirdYearGroupsArray] = useState<GroupEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    let firstYearGroupsTmpArray: GroupEntry[] = [];
    let secondYearGroupsTmpArray: GroupEntry[] = [];
    let thirdYearGroupsTmpArray: GroupEntry[] = [];
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
          .then(() => {
            if (year === primo) {
              firstYearGroupsTmpArray.push(newGroupEntry);
            } else if (year === secondo) {
              secondYearGroupsTmpArray.push(newGroupEntry);
            } else {
              thirdYearGroupsTmpArray.push(newGroupEntry);
            }
          })
      );
    }

    for (const group of firstYearGroupsNames) {
      getData(primo, group.title, group.code, group.mzcode);
    }

    for (const group of secondYearGroupsNames) {
      getData(secondo, group.title, group.code, group.mzcode);
    }

    for (const group of thirdYearGroupsNames) {
      getData(terzo, group.title, group.code, '');
    }

    function compare(a: GroupEntry, b: GroupEntry): number {
      if (a.members < b.members) return 1;
      else if (a.members > b.members) return -1;
      return 0;
    }

    Promise.all(promises).then(() => {
      firstYearGroupsTmpArray.sort(compare);
      secondYearGroupsTmpArray.sort(compare);
      thirdYearGroupsTmpArray.sort(compare);
      setFirstYearGroupsArray(firstYearGroupsTmpArray);
      setSecondYearGroupsArray(secondYearGroupsTmpArray);
      setThirdYearGroupsArray(thirdYearGroupsTmpArray);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="routing">
        <h1 className="ranking-title">Classifica gruppi DMI UNICT</h1>
        <Link to="/channels" className="link-to-channels">
          Visualizza Canali UNICT
        </Link>
      </div>
      <input
        className="search-input-field"
        placeholder="Search..."
        onChange={input => setSearchInput(input.target.value)}></input>
      {loading ? (
        <img src="loading.gif" className="loading" key="loading" alt="loading" />
      ) : (
        <div>
          <h2 className="years-sections-title">Primo anno</h2>
          <div className="contents-grid">
            {firstYearGroupsArray.map(
              (group, index) =>
                group.title.toLowerCase().includes(searchInput.toLowerCase()) && (
                  <div className="cards" key={index++}>
                    <GroupsCards
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
          <h2 className="years-sections-title">Secondo anno</h2>
          <div className="contents-grid">
            {secondYearGroupsArray.map(
              (group, index) =>
                group.title.toLowerCase().includes(searchInput.toLowerCase()) && (
                  <div className="cards" key={index++}>
                    <GroupsCards
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
          <h2 className="years-sections-title">Terzo anno</h2>
          <div className="contents-grid">
            {thirdYearGroupsArray.map(
              (group, index) =>
                group.title.toLowerCase().includes(searchInput.toLowerCase()) && (
                  <div className="cards" key={index++}>
                    <GroupsCards
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
        </div>
      )}
    </div>
  );
}
