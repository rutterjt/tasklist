import React, { useRef } from 'react';

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
import { isDueToday } from '../utils/time';

const Today = () => {
  const taskIds = useSelector(
    (state) => selectTaskIdsByCallback(state, isDueToday),
    shallowEqual
  );

  // persist the data with useRef, to avoid unsyncing the data between Today and TaskCreateForm on subsequent rerenders (and unnecessarily triggering a warning popup when closing the form)
  const todayRef = useRef(new Date().getTime());
  return (
    <Layout>
      <Helmet>
        <title>Today | TaskList</title>
      </Helmet>
      <TaskList label={'Today'} list={taskIds} />
      <TaskCreateDropdown defaultItem={{ due: todayRef.current }} />
    </Layout>
  );
};

export default Today;
