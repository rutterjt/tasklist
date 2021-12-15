import React from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// components
import Layout from '../components/Layout';
import ToDoList from '../components/ToDoList';
import TaskCreateForm from '../components/TaskCreateForm';

// date-fns
import add from 'date-fns/add';

const Tomorrow = ({ list = [] }) => {
  return (
    <Layout>
      <Helmet>
        <title>Tomorrow | To Do List</title>
      </Helmet>
      <ToDoList label={'Tomorrow'} list={list} />
      <TaskCreateForm
        defaultItem={{ due: add(new Date(), { days: 1 }).getTime() }}
      />
    </Layout>
  );
};

export default Tomorrow;
