import React from 'react';
import { Link } from 'react-router-dom';
import menuIcon from '../images/menu.svg';
import './Menu.css';

export function Menu(): JSX.Element {
  return (
    <div>
      <Link to="/channels">
        <div className="pie pie1">
          <h5 className="menu-channels">Channels</h5>
        </div>
      </Link>

      <Link to="/groups">
        <div className="pie pie2">
          <h5 className="menu-groups">Groups</h5>
        </div>
      </Link>

      <Link to="/bots">
        <div className="pie pie3">
          <h5 className="menu-bots">Bots</h5>
        </div>
      </Link>

      <div className="menu" onClick={() => document.body.classList.toggle('active')}>
        <img className="menu-icon" src={menuIcon} alt="Menu Icon"></img>
      </div>
    </div>
  );
}