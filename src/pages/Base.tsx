import { IonContent, IonPage } from '@ionic/react';
import { useState } from 'react';

import TopNavbar from './TopNavbar';
import Channels from './Channels/Channels';
import Groups from './Groups/Groups';
import Bachelor from './Groups/Bachelor';
import Master from './Groups/Master';
import Bots from './Bots/Bots';
import Home from './Home/Home';

import './Base.scss';

interface BaseProps {
  page: string;
}

const Base: React.FC<BaseProps> = (props: BaseProps) => {
  const [searchInput, setSearchInput] = useState<string>('');

  const API: string = 'https://seminaraluigi.altervista.org/list-telegram-groups/';

  return (
    <IonPage>
      <IonContent fullscreen>
        <TopNavbar page={props.page} setSearchInput={setSearchInput} />
        {props.page === 'home' ? (
          <Home />
        ) : props.page === 'channels' ? (
          <Channels API={API} searchInput={searchInput} />
        ) : props.page === 'groups' ? (
          <Groups />
        ) : props.page === 'bachelor' ? (
          <Bachelor API={API} searchInput={searchInput} />
        ) : props.page === 'master' ? (
          <Master API={API} searchInput={searchInput} />
        ) : props.page === 'bots' ? (
          <Bots API={API} searchInput={searchInput} />
        ) : (
          <Home />
        )}
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
