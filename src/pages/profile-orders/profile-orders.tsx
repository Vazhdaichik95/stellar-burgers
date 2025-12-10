import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getOrderAll, getUserOrders } from '../../services/slices/userSlice';
import { useDispatch } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(getUserOrders);

  useEffect(() => {
    dispatch(getOrderAll());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
