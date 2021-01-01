import React from 'react';
import './Cards.scss';

interface Props {
  link: string;
  title: string;
  description: string;
  picture: string;
  isSearch: boolean;
}

export function BotsCards(props: Props): JSX.Element {
  return (
    <ul className="all-cards-contents">
      <img className="images" src={props.picture} alt={props.title + ' picture'} />
      <a className="links" href={props.link}>
        <h1>{props.title}</h1>
      </a>
      <p className="descriptions">{props.description}</p>
    </ul>
  );
}
