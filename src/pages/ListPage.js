import React from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// components
import Layout from '../components/Layout';
import TaskList from '../components/TaskList';
import TaskCreateForm from '../components/TaskCreateForm';

const ListPage = ({ list = [], label = 'To do', defaultItem = {} }) => {
  return (
    <Layout>
      <Helmet>
        <title>{`${label} | `}To Do List</title>
      </Helmet>
      <TaskList label={label} list={list} />
      <TaskCreateForm defaultItem={defaultItem} />
    </Layout>
  );
};

export default ListPage;
