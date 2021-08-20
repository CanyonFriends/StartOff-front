import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../redux/user';

function CheckUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    checkUserLogin();
  }, []);

  const checkUserLogin = () => {
    dispatch(actions.selfRequest());
  };

  return <></>;
}

export default CheckUser;
