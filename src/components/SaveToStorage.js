import { useEffect } from 'react';
import { useStore } from '../store/context';

const setItem = (name, value) =>
  localStorage.setItem(name, JSON.stringify(value));

const SaveToStorage = () => {
  const { list, labels, deleted } = useStore();

  useEffect(() => {
    setItem('list', list);
    setItem('labels', labels);
    setItem('deleted', deleted);
  }, [list, labels, deleted]);

  return null;
};

export default SaveToStorage;
