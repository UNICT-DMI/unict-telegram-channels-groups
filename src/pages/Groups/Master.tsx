import { useEffect, useState } from 'react';
import { FIRST_YEAR_MASTER, SECOND_YEAR_MASTER, groupsNames } from './MasterGroups';
import GroupsCards from '../Cards/GroupsCards';

interface MasterProps {
  API: string;
  searchInput: string;
}

interface GroupEntry {
  title: string;
  link: string;
  description: string;
  pictureURL: string;
  members: number;
  code: string;
}

interface ArrayEntry {
  array: GroupEntry[];
  sectionTitle: string;
}

const Master: React.FC<MasterProps> = (props: MasterProps) => {
  const [firstYearGroupsArray, setFirstYearGroupsArray] = useState<GroupEntry[]>([]);
  const [secondYearGroupsArray, setSecondYearGroupsArray] = useState<GroupEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const promises: Promise<void>[] = [];
  const firstYearGroupsTmpArray: GroupEntry[] = [];
  const secondYearGroupsTmpArray: GroupEntry[] = [];

  const arrays: ArrayEntry[] = [
    { array: firstYearGroupsArray, sectionTitle: 'Primo Anno' },
    { array: secondYearGroupsArray, sectionTitle: 'Secondo Anno' },
  ];

  async function getData(year: string, groupName: string): Promise<void> {
    const newGroupEntry: GroupEntry = {
      title: '',
      link: '',
      description: '',
      pictureURL: '',
      members: 0,
      code: '',
    };

    const request = fetch(encodeURI(`${props.API}mid.php?path=GRUPPI/${year}/${groupName}.json`))
      .then((res) => res.json())
      .then((data) => {
        const tmpLink: string = data.link;
        newGroupEntry.title = groupName;
        newGroupEntry.link = tmpLink.substring(1, tmpLink.length - 1);
        newGroupEntry.description = data.description;

        if (data.image_link === '') {
          newGroupEntry.pictureURL = process.env.PUBLIC_URL + '/telegram.svg';
        } else {
          const tmpPic: string = data.image_link;
          newGroupEntry.pictureURL = tmpPic.substring(1);
        }

        const tmpMembers: string[] = (data.members_number as string).split(' ');
        newGroupEntry.members = parseInt(tmpMembers[0], 10);
        newGroupEntry.code = data.code;
      });

    await Promise.resolve(request).then(() => {
      if (year === FIRST_YEAR_MASTER) {
        firstYearGroupsTmpArray.push(newGroupEntry);
      } else {
        secondYearGroupsTmpArray.push(newGroupEntry);
      }
    });
  }

  function compare(a: GroupEntry, b: GroupEntry): number {
    if (a.members < b.members) return 1;
    if (a.members > b.members) return -1;
    return 0;
  }

  useEffect(() => {
    (async () => {
      (await groupsNames(FIRST_YEAR_MASTER)).forEach((group) => {
        promises.push(getData(FIRST_YEAR_MASTER, group));
      });
      (await groupsNames(SECOND_YEAR_MASTER)).forEach((group) => {
        promises.push(getData(SECOND_YEAR_MASTER, group));
      });

      return Promise.all(promises);
    })()
      .then(() => {
        firstYearGroupsTmpArray.sort(compare);
        secondYearGroupsTmpArray.sort(compare);
        setFirstYearGroupsArray(firstYearGroupsTmpArray);
        setSecondYearGroupsArray(secondYearGroupsTmpArray);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {loading ? (
        <img
          src={process.env.PUBLIC_URL + '/loading.gif'}
          className='loading'
          key='loading'
          alt='loading'
        />
      ) : (
        <div>
          {arrays.map((specificArray) => (
            <div key={specificArray.sectionTitle}>
              <h2 className='years-sections-title'>{specificArray.sectionTitle}</h2>
              <div className='contents-grid'>
                {specificArray.array.map(
                  (group, position) =>
                    group.title.toLowerCase().includes(props.searchInput.toLowerCase()) && (
                      <GroupsCards
                        ranking={position + 1}
                        isSearch={props.searchInput !== ''}
                        title={group.title}
                        link={group.link}
                        description={group.description}
                        picture={group.pictureURL}
                        members={group.members}
                        code={group.code}
                        mzcode=''
                      />
                    )
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Master;
