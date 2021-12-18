import React, { useRef } from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// components
import Layout from '../components/Layout';
import TaskList from '../components/TaskList';
import TaskCreateForm from '../components/TaskCreateForm';

// date-fns
import add from 'date-fns/add';

const Tomorrow = ({ list = [] }) => {
  // persist the data with useRef, to avoid unsyncing the data between Tomorrow and TaskCreateForm on subsequent rerenders (and unnecessarily triggering a warning popup when closing the form)
  const tomorrowRef = useRef(add(new Date(), { days: 1 }).getTime());

  return (
    <Layout>
      <Helmet>
        <title>Tomorrow | To Do List</title>
      </Helmet>
      <TaskList label={'Tomorrow'} list={list} />
      <TaskCreateForm defaultItem={{ due: tomorrowRef.current }} />
    </Layout>
  );
};

export default Tomorrow;
