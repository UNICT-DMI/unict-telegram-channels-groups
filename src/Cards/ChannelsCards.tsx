import React from 'react';
import './Cards.css';

interface Props {
  link: string;
  title: string;
  description: string;
  picture: string;
  isSearch: boolean;
  ranking: number;
  subscribers: number;
}

export function ChannelsCards(props: Props): JSX.Element {
  return (
    <ul className="all-cards-contents">
      <div className="images-and-rankings">
        <a href={props.link}>
          <img className="images" src={props.picture} alt={props.title + ' picture'} />
        </a>
        <h2 className="rankings">{props.isSearch ? '' : props.ranking + '°'}</h2>
      </div>
      <a className="links" href={props.link}>
        <h1>{props.title}</h1>
      </a>
      <p className="descriptions">{props.description}</p>
      <p className="subscribers">Subscribers: {props.subscribers}</p>
    </ul>
  );
}
