import { useEffect } from 'react';

// routing
import { useLocation } from 'react-router-dom';

// store
import { useStore } from '../store/useStore';
import { CLOSE_NAV } from '../store/actions';

const PageChange = () => {
  const { pathname } = useLocation();
  const { dispatch } = useStore();
  useEffect(() => {
    dispatch({ type: CLOSE_NAV, payload: false });
  }, [pathname, dispatch]);

  return null;
};

export default PageChange;
