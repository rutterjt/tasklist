import React from 'react';

// redux
import { useSelector, shallowEqual } from 'react-redux';

// react helmet
import { Helmet } from 'react-helmet-async';

// components
import Layout from '../components/Layout';
import TaskList from '../features/tasks/TaskList';
import TaskCreateDropdown from '../features/tasks/TaskCreateDropdown';

// store
import { selectTaskIdsByCallback } from '../features/tasks/tasksSlice';

// utils
import { isDueInFuture } from '../utils/time';

const Upcoming = () => {
  const taskIds = useSelector(
    (state) => selectTaskIdsByCallback(state, isDueInFuture),
    shallowEqual
  );

  return (
    <Layout>
      <Helmet>
        <title>Upcoming | TaskList</title>
      </Helmet>
      <TaskList label={'Upcoming'} list={taskIds} />
      <TaskCreateDropdown />
    </Layout>
  );
};

export default Upcoming;
