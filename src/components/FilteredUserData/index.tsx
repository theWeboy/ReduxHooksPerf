import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { VariableSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { InitialStateType, ById } from '../../store/rootReducer';
import Card from '../Card';

type StateProps = {
  byId?: ById;
  filteredIds?: number[];
};

type filteredDataType = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
}[];

const FilteredUserData: React.SFC = () => {
  // useSelector to fetch the filtered todos from redux store and render the result
  const { byId, filteredIds } = useSelector<InitialStateType, StateProps>((state: InitialStateType) => {
    return {
      byId: state.byId,
      filteredIds: state.filteredIds,
    };
  }, shallowEqual);

  const [filteredData, setFilteredData] = useState<filteredDataType>([]);

  useEffect(() => {
    if (filteredIds && byId) {
      const filteredUsers: any = filteredIds.map(id => byId[id]);
      setFilteredData(filteredUsers);
    }
  }, [filteredIds]);

  const FilterCardItem = ({ index, style }: any) => {
    const item = filteredData[index];
    return (
      <div style={style}>
        <Card userId={item.id} key={item.id} />
      </div>
    );
  };

  const rowHeights = filteredData.map(() => {
    return 265;
  });

  const getItemSize = (index: number) => rowHeights[index];

  return (
    <div style={{ marginTop: '20px' }}>
      <div style={{ marginTop: '20px' }}>
        {console.count('[FilteredUserData] rendered')}
        Filtered Users
      </div>
      <div className="data-container" style={{ minHeight: `calc(100vh - 179px)` }}>
        <AutoSizer>
          {({ height, width }) => (
            <VariableSizeList
              height={height}
              itemCount={filteredData.length}
              itemSize={getItemSize}
              width={width}
              overscanCount={4}
            >
              {FilterCardItem}
            </VariableSizeList>
          )}
        </AutoSizer>
        {/* {filteredData.map((obj: any) => {
          return <Card userId={obj.id} key={obj.id} />;
        })} */}
      </div>
    </div>
  );
};

export default FilteredUserData;
