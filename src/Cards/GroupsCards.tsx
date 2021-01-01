import React from 'react';
import './Cards.scss';

interface Props {
  link: string;
  title: string;
  description: string;
  picture: string;
  isSearch: boolean;
  ranking: number;
  members: number;
  mzcode?: string;
  code: string;
}

export function GroupsCards(props: Props): JSX.Element {
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
      <p className="members">Members: {props.members}</p>
      {props.mzcode !== '' ? (
        <div className="codes">
          <p>
            Codice Teams A-L: <b className="code">{props.code}</b>
          </p>
          <p>
            Codice Teams M-Z: <b className="code">{props.mzcode}</b>
          </p>
        </div>
      ) : (
        <p className="codes">
          Codice Teams: <b className="code">{props.code}</b>
        </p>
      )}
    </ul>
  );
}
