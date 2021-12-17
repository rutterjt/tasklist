import React from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// components
import Layout from '../components/Layout';
import TaskList from '../components/TaskList';
import TaskCreateForm from '../components/TaskCreateForm';

// date-fns
import add from 'date-fns/add';

const Tomorrow = ({ list = [] }) => {
  return (
    <Layout>
      <Helmet>
        <title>Tomorrow | To Do List</title>
      </Helmet>
      <TaskList label={'Tomorrow'} list={list} />
      <TaskCreateForm
        defaultItem={{ due: add(new Date(), { days: 1 }).getTime() }}
      />
    </Layout>
  );
};

export default Tomorrow;
