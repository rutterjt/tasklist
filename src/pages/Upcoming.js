import React from 'react';

// redux
import { useSelector, shallowEqual } from 'react-redux';

// react helmet
import { Helmet } from 'react-helmet-async';

// components
import Layout from '../components/Layout';
import TaskList from '../components/TaskList';
import TaskCreateDropdown from '../components/TaskCreateDropdown';

// store
import { selectTaskIdsByCallback } from '../store/slices/listSlice';

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
