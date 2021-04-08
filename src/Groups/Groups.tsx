import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '../Menu/Menu';
import './Groups.scss';

export default function Groups(): JSX.Element {
  return (
    <div>
      <Menu
        section='groups'
        setSearchInput={() => {
          return 'disabled';
        }}
      />

      <div className='groups'>
        <Link to='groups/bachelor' className='bachelor'>
          Triennale
        </Link>
        <Link to='groups/master' className='master'>
          Magistrale
        </Link>
      </div>
    </div>
  );
}
