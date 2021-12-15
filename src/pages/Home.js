import React from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// components
import Layout from '../components/Layout';
import ToDoList from '../components/ToDoList';
import TaskCreateForm from '../components/TaskCreateForm';

const Home = ({ list = [], label = 'To do', defaultItem = {} }) => {
  return (
    <Layout>
      <Helmet>
        <title>All Tasks | To Do List</title>
      </Helmet>
      <ToDoList label={'All Tasks'} list={list} />
      <TaskCreateForm defaultItem={{}} />
    </Layout>
  );
};

export default Home;
