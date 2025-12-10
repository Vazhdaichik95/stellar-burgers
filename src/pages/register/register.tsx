import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import {
  getUserError,
  registrationUser
} from '../../services/slices/userSlice';
import { useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector(getUserError);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      registrationUser({
        email: email,
        name: userName,
        password: password
      })
    );
    navigate('/login');
  };

  return (
    <RegisterUI
      errorText={error?.toString()}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
