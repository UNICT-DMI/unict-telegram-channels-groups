import './Cards.scss';

interface BotsProps {
  link: string;
  title: string;
  description: string;
  picture: string;
}

const BotsCards: React.FC<BotsProps> = (props: BotsProps) => {
  return (
    <div className='cards' key={props.title}>
      <ul className='all-cards-contents'>
        <img className='images' src={props.picture} alt={`${props.title}`} />
        <a className='links' href={props.link}>
          <h1>{props.title}</h1>
        </a>
        <p className='descriptions'>{props.description}</p>
      </ul>
    </div>
  );
};

export default BotsCards;
