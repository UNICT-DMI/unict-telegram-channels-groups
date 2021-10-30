import { Link } from 'react-router-dom';
import './TopNavbar.scss';

interface TopNavbarProps {
  page: string;
  setSearchInput: (input: string) => void;
}

const TopNavbar: React.FC<TopNavbarProps> = (props: TopNavbarProps) => {
  return (
    <div className='navbar'>
      <div className='links'>
        <Link to='/home'>Home</Link>
        <Link to='/channels'>Classifica Canali UNICT</Link>
        <Link to='/groups'>Classifica Gruppi DMI UNICT</Link>
        <Link to='/bots'>Bots UNICT</Link>
      </div>
      {props.page !== 'home' && props.page !== 'groups' ? (
        <form>
          <label htmlFor='search'>Filter: </label>
          <input id='search' onChange={(input) => props.setSearchInput(input.target.value)}></input>
        </form>
      ) : null}
    </div>
  );
};

export default TopNavbar;
