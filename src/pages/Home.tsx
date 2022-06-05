import React from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// components
import Layout from '../components/Layout';
import TaskList from '../components/TaskList';
import { TaskCreateDropdown } from '../components/TaskCreateDropdown';

// store
import { useStore } from '../store/useStore';

export const Home: React.FC = () => {
  const { list } = useStore();

  return (
    <Layout>
      <Helmet>
        <title>All Tasks | TaskList</title>
      </Helmet>
      <TaskList label={'All Tasks'} list={list} />
      <TaskCreateDropdown />
    </Layout>
  );
};

export default Home;
