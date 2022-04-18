import React from 'react';

// redux
import { useSelector, shallowEqual } from 'react-redux';

// store
import { selectTaskIds } from '../features/tasks/tasksSlice';

// components
import { Layout } from '../components';
import TaskList from '../features/tasks/TaskList';
import TaskCreateDropdown from '../features/tasks/TaskCreateDropdown';

const Home = () => {
  const taskIds = useSelector(selectTaskIds, shallowEqual);

  return (
    <Layout title="All Tasks | TaskList">
      <TaskList label="All Tasks" taskIds={taskIds} />
      <TaskCreateDropdown />
    </Layout>
  );
};

export default Home;
