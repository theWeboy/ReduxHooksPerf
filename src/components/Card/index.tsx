/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { InitialStateType } from '../../store/rootReducer';
import './Card.css';

interface StateProps {
  userData?: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    ip_address: string;
  };
}

interface CardProps {
  userId: number;
}

const Card: React.FC<CardProps> = ({ userId, ...props }: CardProps) => {
  const { userData } = useSelector<InitialStateType, StateProps>((state: InitialStateType) => {
    const { byId } = state;
    if (byId) {
      return {
        userData: byId[userId],
      };
    }
    return {};
  }, shallowEqual);

  const { id = 0, first_name = '', last_name = '', email = '', gender = '', ip_address = '' }: any = userData;
  return (
    <div className="list-container">
      {console.count(`[Card] component rendered ${id}`)}
      <div className="list-item">
        <p>id : {id}</p>
        <p>First Name : {first_name}</p>
        <p>Last Name : {last_name}</p>
        <p>Email : {email}</p>
        <p>Gender : {gender}</p>
        <p>I.P : {ip_address}</p>
      </div>
    </div>
  );
};

export default Card;
