import { IonContent, IonPage } from '@ionic/react';
import { useState } from 'react';

import TopNavbar from './TopNavbar';

import './Base.scss';
import Channels from './Channels/Channels';
import Groups from './Groups/Groups';
import Bachelor from './Groups/Bachelor';
import Master from './Groups/Master';
import Bots from './Bots/Bots';
import Home from './Home/Home';

interface BaseProps {
  page: string;
}

const Base: React.FC<BaseProps> = (props: BaseProps) => {
  const [searchInput, setSearchInput] = useState<string>('');

  const API: string = 'https://seminaraluigi.altervista.org/list-telegram-groups/api.telegram.php?';

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
          <Bachelor />
        ) : props.page === 'master' ? (
          <Master />
        ) : props.page === 'bots' ? (
          <Bots />
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
