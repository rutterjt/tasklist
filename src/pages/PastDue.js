import React from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// components
import Layout from '../components/Layout';
import TaskList from '../components/TaskList';
import TaskCreateForm from '../components/TaskCreateForm';

const PastDue = ({ list = [] }) => {
  return (
    <Layout>
      <Helmet>
        <title>Past Due | To Do List</title>
      </Helmet>
      <TaskList label={'Past Due'} list={list} />
      <TaskCreateForm />
    </Layout>
  );
};

export default PastDue;
