import React, { useRef } from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// date-fns
import add from 'date-fns/add';

// components
import Layout from '../components/Layout';
import TaskList from '../components/TaskList';
import TaskCreateForm from '../components/forms/TaskCreateForm';

// store
import { useStore } from '../store/useStore';

// utils
import { isDueTomorrow } from '../utils/time';

const Tomorrow = () => {
  const { list } = useStore();

  const filteredList = list.filter(isDueTomorrow);

  // persist the data with useRef, to avoid unsyncing the data between Tomorrow and TaskCreateForm on subsequent rerenders (and unnecessarily triggering a warning popup when closing the form)
  const tomorrowRef = useRef(add(new Date(), { days: 1 }).getTime());

  return (
    <Layout>
      <Helmet>
        <title>Tomorrow | To Do List</title>
      </Helmet>
      <TaskList label={'Tomorrow'} list={filteredList} />
      <TaskCreateForm defaultItem={{ due: tomorrowRef.current }} />
    </Layout>
  );
};

export default Tomorrow;
