import { useEffect } from 'react';

// routing
import { useLocation } from 'react-router-dom';

// redux
import { useDispatch } from 'react-redux';

// store
import { navClosed } from '../store/slices/navSlice';

/**
 * Utility component that closes the nav whenever the user changes pages.
 */
const PageChange = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  useEffect(() => {
    dispatch(navClosed());
  }, [pathname, dispatch]);

  return null;
};

export default PageChange;
