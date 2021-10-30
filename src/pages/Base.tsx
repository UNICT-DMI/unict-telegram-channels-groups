import { IonContent, IonPage } from '@ionic/react';
import { useState } from 'react';

import TopNavbar from './TopNavbar';
import Menu from './Menu/Menu';

import './Base.scss';

interface BaseProps {
  page: string;
}

const Base: React.FC<BaseProps> = (props: BaseProps) => {
  const [searchInput, setSearchInput] = useState<string>('');

  return (
    <IonPage>
      <IonContent fullscreen>
        <TopNavbar page={props.page} setSearchInput={setSearchInput} />
        {props.page === 'home' ? <Menu /> : null}
        <div className='credits'>
          Coded by
          <a href='https://github.com/Lorenzo-Pappalardo'>Lorenzo Pappalardo</a>
          <a href='https://github.com/Helias'>Stefano Borzì</a>
          <a href='https://github.com/Gigi-G'>Luigi Seminara</a>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Base;
