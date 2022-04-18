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
import { isPastDue } from '../utils/time';

const PastDue = () => {
  const taskIds = useSelector(
    (state) => selectTaskIdsByCallback(state, isPastDue),
    shallowEqual
  );

  return (
    <Layout>
      <Helmet>
        <title>Past Due | TaskList</title>
      </Helmet>
      <TaskList label={'Past Due'} list={taskIds} />
      <TaskCreateDropdown />
    </Layout>
  );
};

export default PastDue;
