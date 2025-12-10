import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  feedIsLoading,
  getAllOrders,
  getFeeds
} from '../../services/slices/feedSlice';
import { useDispatch } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getAllOrders);
  const isLoading = useSelector(feedIsLoading);

  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
};
