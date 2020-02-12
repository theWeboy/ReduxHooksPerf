import React, { useState, ReactNode } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Modal } from 'antd';
import { InitialStateType, ById } from '../../store/rootReducer';
import Button from '../Button';
import { getFilteredIds, modifyFilterCriteria } from '../../utils';

// import { FilterData } from '../../utils';

type StateProps = {
  byId?: ById;
  filterCriteria?: string[];
};

interface SelectFiltersModalProps {
  children: JSX.Element | ReactNode;
}

const SelectFiltersModal: React.FC<SelectFiltersModalProps> = ({ children, ...props }: SelectFiltersModalProps) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { byId, filterCriteria } = useSelector<InitialStateType, StateProps>((state: InitialStateType) => {
    return {
      byId: state.byId,
      filterCriteria: state.filterCriteria,
    };
  }, shallowEqual);

  const dispatch = useDispatch();

  const showModal = () => {
    setVisible(true);
  };

  const getUsers = () => {
    // return [];
    if (byId) {
      return Object.keys(byId).map((id: any) => byId[id]);
    }
    return [];
    // return (Object.keys(byId) as string[]).map((id: any) => byId[id]);
  };

  const handleOk = async () => {
    // onSubmitHandler();
    // useSelector to retrieve filter criteria state and Call the utils filter function to filter the data and update filter ids
    // console.log('[Modal Component] {handleOk} function');
    const deNormalizedUsers = getUsers();
    const modifiedFilters = modifyFilterCriteria(filterCriteria);
    const filteredIds = getFilteredIds(deNormalizedUsers, modifiedFilters);
    dispatch({ type: 'UPDATE_FILTERED_IDS', payload: { filteredIds: filteredIds } });

    setConfirmLoading(true);
    setVisible(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      {console.count('[Filter Modal] rendered')}
      <Button onClick={showModal} content="Select Data Filters" />
      <Modal
        title="Select Filters"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    </div>
  );
};

export default SelectFiltersModal;
