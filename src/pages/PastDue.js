import React from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// components
import Layout from '../components/Layout';
import TaskList from '../components/TaskList';
import TaskCreateForm from '../components/TaskCreateForm';

// store
import { useStore } from '../store/useStore';

// utils
import { isPastDue } from '../utils/time';

const PastDue = () => {
  const { list } = useStore();

  const filteredList = list.filter(isPastDue);
  return (
    <Layout>
      <Helmet>
        <title>Past Due | To Do List</title>
      </Helmet>
      <TaskList label={'Past Due'} list={filteredList} />
      <TaskCreateForm />
    </Layout>
  );
};

export default PastDue;
