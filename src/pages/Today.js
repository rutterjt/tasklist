import React from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// components
import Layout from '../components/Layout';
import TaskList from '../components/TaskList';
import TaskCreateForm from '../components/TaskCreateForm';

const Today = ({ list = [] }) => {
  return (
    <Layout>
      <Helmet>
        <title>Today | To Do List</title>
      </Helmet>
      <TaskList label={'Today'} list={list} />
      <TaskCreateForm defaultItem={{ due: new Date().getTime() }} />
    </Layout>
  );
};

export default Today;
