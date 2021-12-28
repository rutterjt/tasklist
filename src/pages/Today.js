import React, { useRef } from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// components
import Layout from '../components/Layout';
import TaskList from '../components/TaskList';
import TaskCreateForm from '../components/forms/TaskCreateForm';

// store
import { useStore } from '../store/useStore';

// utils
import { isDueToday } from '../utils/time';

const Today = () => {
  const { list } = useStore();

  const filteredList = list.filter(isDueToday);

  // persist the data with useRef, to avoid unsyncing the data between Today and TaskCreateForm on subsequent rerenders (and unnecessarily triggering a warning popup when closing the form)
  const todayRef = useRef(new Date().getTime());
  return (
    <Layout>
      <Helmet>
        <title>Today | To Do List</title>
      </Helmet>
      <TaskList label={'Today'} list={filteredList} />
      <TaskCreateForm defaultItem={{ due: todayRef.current }} />
    </Layout>
  );
};

export default Today;
