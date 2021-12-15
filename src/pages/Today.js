import React from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// components
import Layout from '../components/Layout';
import ToDoList from '../components/ToDoList';
import TaskCreateForm from '../components/TaskCreateForm';

const Today = ({ list = [] }) => {
  return (
    <Layout>
      <Helmet>
        <title>Today | To Do List</title>
      </Helmet>
      <ToDoList label={'Today'} list={list} />
      <TaskCreateForm defaultItem={{ due: new Date().getTime() }} />
    </Layout>
  );
};

export default Today;
