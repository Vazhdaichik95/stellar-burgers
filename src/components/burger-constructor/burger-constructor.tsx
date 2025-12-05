import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from 'react-redux';
import {
  getConstructorItems,
  getOrderModalData,
  getOrderRequest,
  orderBurger,
  resetOrderModalData,
  setRequestOrder
} from '../../services/slices/constructorSlice';
import { transferIngredientsForAPI } from '../../utils/common';
import { userIsAuthenticated } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(getConstructorItems);

  const orderRequest = useSelector(getOrderRequest);

  const orderModalData = useSelector(getOrderModalData);

  const isAuth = useSelector(userIsAuthenticated);

  const onOrderClick = () => {
    if (isAuth && constructorItems.bun) {
      dispatch(setRequestOrder(true));
      dispatch(orderBurger(transferIngredientsForAPI(constructorItems)));
    } else if (isAuth && !constructorItems.bun) {
      return;
    } else if (!isAuth) {
      navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {
    dispatch(setRequestOrder(false));
    dispatch(resetOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  //return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
