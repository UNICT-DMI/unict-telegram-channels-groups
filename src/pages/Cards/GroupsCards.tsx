import './Cards.scss';

interface GroupsProps {
  link: string;
  title: string;
  description: string;
  picture: string;
  isSearch: boolean;
  ranking: number;
  members: number;
  mzcode: string;
  code: string;
}

const GroupsCards: React.FC<GroupsProps> = (props: GroupsProps) => {
  return (
    <div className='cards' key={props.title}>
      <ul className='all-cards-contents'>
        <div className='images-and-rankings'>
          <a href={props.link}>
            <img className='images' src={props.picture} alt={`${props.title}`} />
          </a>
          <h2 className='rankings'>{props.isSearch ? '' : `${props.ranking}°`}</h2>
        </div>
        <a className='links' href={props.link}>
          <h1>{props.title}</h1>
        </a>
        <p className='descriptions'>{props.description}</p>
        <p className='members'>Members: {props.members}</p>
        {props.mzcode !== '' ? (
          <div>
            <p className='team'>
              Codice Teams A-L: <b className='code'>{props.code}</b>
            </p>
            <p className='team'>
              Codice Teams M-Z: <b className='code'>{props.mzcode}</b>
            </p>
          </div>
        ) : props.code !== '' ? (
          <p className='team'>
            Codice Teams: <b className='code'>{props.code}</b>
          </p>
        ) : null}
      </ul>
    </div>
  );
};

export default GroupsCards;
