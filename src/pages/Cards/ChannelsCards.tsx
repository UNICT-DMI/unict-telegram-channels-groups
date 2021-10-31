import './Cards.scss';

interface ChannelsProps {
  link: string;
  title: string;
  description: string;
  picture: string;
  isSearch: boolean;
  ranking: number;
  subscribers: number;
}

const ChannelsCards: React.FC<ChannelsProps> = (props: ChannelsProps) => {
  return (
    <div className='cards' key={props.title}>
      <ul className='all-cards-contents'>
        <div className='images-and-rankings'>
          <a className='images' href={props.link}>
            <img src={props.picture} alt={`${props.title}`} />
          </a>
          <h2 className='rankings'>{props.isSearch ? '' : `${props.ranking}°`}</h2>
        </div>
        <a className='links' href={props.link}>
          <h1>{props.title}</h1>
        </a>
        <p className='descriptions'>{props.description}</p>
        <p className='subscribers'>Subscribers: {props.subscribers}</p>
      </ul>
    </div>
  );
};

export default ChannelsCards;
