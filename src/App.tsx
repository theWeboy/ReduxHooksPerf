/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Data } from './data';
import './App.css';
import Button from './components/Button';
import CheckBoxComponent from './components/CheckBoxComponent';
import SelectFiltersModal from './components/SelectFiltersModal';
import UpdateUserModal from './components/UpdateUserModal';
import All from './components/All';
import FilteredUserData from './components/FilteredUserData';

type usersObjType = {
  [id: number]: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    ip_address: string;
  };
};

const App: React.SFC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const dispatch = useDispatch();

  const normalizeData = () => {
    const usersObj: usersObjType = {};
    for (let i = 0; i < Data.length; i++) {
      const user = Data[i];
      const { id } = user;
      usersObj[id] = user;
    }
    return usersObj;
  };

  useEffect(() => {
    const normalizedData = normalizeData();
    dispatch({ type: 'ADD_USERS', payload: { usersById: normalizedData } });
  }, []);

  const tabSelectHandler = (selectedTab: string) => {
    if (activeTab !== selectedTab) {
      setActiveTab(selectedTab);
    }
  };

  const renderSwitch = () => {
    switch (activeTab) {
      case 'All': {
        return <All />;
      }
      case 'Filtered':
        return <FilteredUserData />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      {console.count('[App] Component rendered ')}
      <header className="App-header">
        <h2>React Redux with Hooks </h2>
      </header>
      <div className="tab-header">
        <Button content="All" onClick={() => tabSelectHandler('All')} />
        <Button content="Filtered" onClick={() => tabSelectHandler('Filtered')} />
        <SelectFiltersModal>
          <CheckBoxComponent options={['Female', 'Male', 'Even Ids', 'Odd Ids']} defaultCheckedList={[]} />
        </SelectFiltersModal>
        <UpdateUserModal />
      </div>
      {renderSwitch()}
    </div>
  );
};

export default App;
