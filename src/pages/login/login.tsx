import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import {
  getUserError,
  loginUser,
  userIsAuthenticated
} from '../../services/slices/userSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector(getUserError);
  const isAuthenticated = useSelector(userIsAuthenticated);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    dispatch(
      loginUser({
        email: email,
        password: password
      })
    );

    if (isAuthenticated) {
      navigate('/');
    }
  };

  return (
    <LoginUI
      errorText={error?.toString()}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
