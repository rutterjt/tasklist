import { useEffect } from 'react';

// store
import { useStore } from '../store/useStore';

const setItem = (name, value) =>
  localStorage.setItem(name, JSON.stringify(value));

const SaveToStorage = () => {
  const { list, labels, deleted, sortBy } = useStore();

  useEffect(() => {
    setItem('list', list);
    setItem('labels', labels);
    setItem('deleted', deleted);
    setItem('sortBy', sortBy);
  }, [list, labels, deleted, sortBy]);

  return null;
};

export default SaveToStorage;
