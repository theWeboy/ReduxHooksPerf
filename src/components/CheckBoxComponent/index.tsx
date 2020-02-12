import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

interface CheckBoxComponentProps {
  options: string[];
  defaultCheckedList?: string[];
}

const CheckBoxComponent: React.SFC<CheckBoxComponentProps> = (props: CheckBoxComponentProps) => {
  const { options, defaultCheckedList } = props;
  const [checkList, setCheckList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch action to update the filtering criteria keys
    dispatch({ type: 'UPDATE_FILTER_CRITERIA', payload: { filterCriteria: checkList } });
  }, [checkList]);

  const onChange = (checkedList: any) => {
    setCheckList(checkedList);
    const indeterminateCheck = !!checkedList.length && checkedList.length < options.length;
    const checkAllCase = checkedList.length === options.length;
    setIndeterminate(indeterminateCheck);
    setCheckAll(checkAllCase);
  };

  const onCheckAllChange = (e: any) => {
    e.target.checked ? setCheckList(options) : setCheckList([]);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <div>
      <div style={{ borderBottom: '1px solid #E9E9E9' }}>
        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
          Select all
        </Checkbox>
      </div>
      <br />
      <CheckboxGroup options={options} value={checkList} onChange={onChange} />
    </div>
  );
};

export default CheckBoxComponent;
