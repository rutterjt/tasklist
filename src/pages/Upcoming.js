import React from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// components
import Layout from '../components/Layout';
import TaskList from '../components/TaskList';
import TaskCreateForm from '../components/forms/TaskCreateForm';

// store
import { useStore } from '../store/useStore';

// utils
import { isDueInFuture } from '../utils/time';

const Upcoming = () => {
  const { list } = useStore();

  const filteredList = list.filter(isDueInFuture);

  return (
    <Layout>
      <Helmet>
        <title>Upcoming | TaskList</title>
      </Helmet>
      <TaskList label={'Upcoming'} list={filteredList} />
      <TaskCreateForm />
    </Layout>
  );
};

export default Upcoming;
