import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Modal } from 'antd';
import Button from '../Button';

const UpdateUserModal: React.SFC = () => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [inputId, setInputId] = useState(1);
  const [inputFirstName, setInputFirstName] = useState('');
  const [inputLastName, setInputLastName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputGender, setInputGender] = useState('');
  const [inputIP, setInputIP] = useState('');

  const dispatch = useDispatch();

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    const userData = {
      id: inputId,
      first_name: inputFirstName,
      last_name: inputLastName,
      email: inputEmail,
      gender: inputGender,
      ip_address: inputIP,
    };

    dispatch({
      type: 'UPDATE_USER',
      payload: {
        userId: inputId,
        userData,
      },
    });

    setConfirmLoading(true);
    setVisible(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const inputVal = e.target.value;
    switch (field) {
      case 'ID': {
        const modID = parseInt(inputVal);
        setInputId(modID);
        break;
      }
      case 'FIRST_NAME': {
        setInputFirstName(inputVal);
        break;
      }
      case 'LAST_NAME': {
        setInputLastName(inputVal);
        break;
      }
      case 'EMAIL': {
        setInputEmail(inputVal);
        break;
      }
      case 'GENDER': {
        setInputGender(inputVal);
        break;
      }
      case 'IP': {
        setInputIP(inputVal);
        break;
      }
      default:
        break;
    }
  };

  return (
    <div>
      <Button onClick={showModal} content="Update User Data" />
      <Modal
        title="Fill Updated User Data"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="inputGroup">
          <p>Enter ID: </p>
          <Input placeholder="Enter User ID" onChange={value => handleChange(value, 'ID')} />
        </div>
        <div className="inputGroup">
          <p>Enter First Name: </p>
          <Input placeholder="Enter User's First Name" onChange={value => handleChange(value, 'FIRST_NAME')} />
        </div>
        <div className="inputGroup">
          <p>Enter Last Name: </p>
          <Input placeholder="Enter User's Last Name" onChange={value => handleChange(value, 'LAST_NAME')} />
        </div>
        <div className="inputGroup">
          <p>Enter Email: </p>
          <Input placeholder="Enter Email" onChange={value => handleChange(value, 'EMAIL')} />
        </div>
        <div className="inputGroup">
          <p>Enter Gender: </p>
          <Input placeholder="Enter User's Gender" onChange={value => handleChange(value, 'GENDER')} />
        </div>
        <div className="inputGroup">
          <p>Enter IP: </p>
          <Input placeholder="Enter User's IP" onChange={value => handleChange(value, 'IP')} />
        </div>
      </Modal>
    </div>
  );
};

export default UpdateUserModal;
