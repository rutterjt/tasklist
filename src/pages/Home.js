import React from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// components
import Layout from 'components/Layout';
import TaskList from 'components/TaskList';
import TaskCreateForm from 'components/Forms/TaskCreateForm';

// store
import { useStore } from 'store/useStore';

const Home = () => {
  const { list } = useStore();

  return (
    <Layout>
      <Helmet>
        <title>All Tasks | To Do List</title>
      </Helmet>
      <TaskList label={'All Tasks'} list={list} />
      <TaskCreateForm />
    </Layout>
  );
};

export default Home;
