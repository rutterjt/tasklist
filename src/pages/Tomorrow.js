import React, { useRef } from 'react';

// redux
import { useSelector, shallowEqual } from 'react-redux';

// react helmet
import { Helmet } from 'react-helmet-async';

// date-fns
import add from 'date-fns/add';

// components
import Layout from '../components/Layout';
import TaskList from '../components/TaskList';
import TaskCreateDropdown from '../components/TaskCreateDropdown';

// store
import { selectTaskIdsByCallback } from '../store/slices/listSlice';

// utils
import { isDueTomorrow } from '../utils/time';

const Tomorrow = () => {
  const taskIds = useSelector(
    (state) => selectTaskIdsByCallback(state, isDueTomorrow),
    shallowEqual
  );

  // persist the data with useRef, to avoid unsyncing the data between Tomorrow and TaskCreateForm on subsequent rerenders (and unnecessarily triggering a warning popup when closing the form)
  const tomorrowRef = useRef(add(new Date(), { days: 1 }).getTime());

  return (
    <Layout>
      <Helmet>
        <title>Tomorrow | TaskList</title>
      </Helmet>
      <TaskList label={'Tomorrow'} list={taskIds} />
      <TaskCreateDropdown defaultItem={{ due: tomorrowRef.current }} />
    </Layout>
  );
};

export default Tomorrow;
