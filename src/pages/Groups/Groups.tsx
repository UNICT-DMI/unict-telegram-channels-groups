import { IonCard, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonRow } from '@ionic/react';
import { Link } from 'react-router-dom';
import './Groups.scss';

const Groups: React.FC = () => (
  <IonGrid>
    <IonRow>
      <IonCol>
        <Link to='/groups/bachelor' className='link'>
          <IonCard className='card'>
            <IonCardHeader>
              <IonCardTitle className='card-title'>Triennale</IonCardTitle>
            </IonCardHeader>
          </IonCard>
        </Link>
      </IonCol>
      <IonCol>
        <Link to='/groups/master' className='link'>
          <IonCard className='card'>
            <IonCardHeader>
              <IonCardTitle className='card-title'>Magistrale</IonCardTitle>
            </IonCardHeader>
          </IonCard>
        </Link>
      </IonCol>
    </IonRow>
  </IonGrid>
);

export default Groups;
