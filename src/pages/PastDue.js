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
