import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { VariableSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { InitialStateType } from '../../store/rootReducer';
import Card from '../Card';
import { ById } from '../../store/rootReducer';

type StateProps = {
  byId?: ById;
};

type StoreUserObjProps = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
};

type StoreUsersProps = StoreUserObjProps[];

const All: React.SFC = () => {
  const { byId } = useSelector<InitialStateType, StateProps>((state: InitialStateType) => {
    return {
      byId: state.byId,
    };
  }, shallowEqual);

  const [storeUsers, setStoreUsers] = useState<StoreUsersProps>([]);

  const getUsers = () => {
    if (byId) {
      return Object.keys(byId).map((id: any) => byId[id]);
    }
    return [];
  };

  const UserCardItem = ({ index, style }: any) => {
    const item = storeUsers[index];
    return (
      <div style={style}>
        <Card userId={item.id} key={item.id} />
      </div>
    );
  };

  const rowHeights = storeUsers.map(() => {
    return 265;
  });

  const getItemSize = (index: number) => rowHeights[index];

  useEffect(() => {
    const usersFromStore = getUsers();
    setStoreUsers(usersFromStore);
  }, [byId]);

  return (
    <div style={{ marginTop: '20px' }}>
      {console.count('[All] component rendered!')}
      <div>All</div>
      <div className="data-container" style={{ minHeight: `calc(100vh - 179px)` }}>
        <AutoSizer>
          {({ height, width }) => (
            <VariableSizeList
              height={height}
              itemCount={storeUsers.length}
              itemSize={getItemSize}
              width={width}
              overscanCount={4}
            >
              {UserCardItem}
            </VariableSizeList>
          )}
        </AutoSizer>
        {/* {storeUsers.map(obj => {
          // console.log('obj from storeUsers map: ', obj);
          return <Card userId={obj.id} key={obj.id} />;
        })} */}
      </div>
    </div>
  );
};

export default All;
