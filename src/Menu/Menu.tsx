import React from 'react';
import './Menu.css';

import menuIcon from '../images/menu.svg';

export function Menu(): JSX.Element {
  return (
    <div>
      <div className="pie pie1"/>

      <div className="pie pie2"/>

      <div className="pie pie3"/>

      <div className="menu" onClick={() => document.body.classList.toggle('active')}>
        <img className="menu-icon" src={menuIcon} alt="Menu Icon"></img>
      </div>
    </div>
  );
}
