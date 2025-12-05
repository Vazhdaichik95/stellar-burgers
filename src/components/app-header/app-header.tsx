import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { getUserData } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const userName = useSelector(getUserData)?.name;

  return <AppHeaderUI userName={userName ? userName : ''} />;
};
