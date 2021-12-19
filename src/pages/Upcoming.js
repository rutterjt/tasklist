import React from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// components
import Layout from 'components/Layout';
import TaskList from 'components/TaskList';
import TaskCreateForm from 'components/Forms/TaskCreateForm';

// store
import { useStore } from 'store/useStore';

// utils
import { isDueInFuture } from 'utils/time';

const Upcoming = () => {
  const { list } = useStore();

  const filteredList = list.filter(isDueInFuture);

  return (
    <Layout>
      <Helmet>
        <title>Upcoming | To Do List</title>
      </Helmet>
      <TaskList label={'Upcoming'} list={filteredList} />
      <TaskCreateForm />
    </Layout>
  );
};

export default Upcoming;
