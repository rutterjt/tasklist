import React from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// redux
import { useSelector, shallowEqual } from 'react-redux';

// store
import { selectTaskIds } from '../store/slices/listSlice';

// components
import Layout from '../components/Layout';
import TaskList from '../components/TaskList';
import TaskCreateDropdown from '../components/TaskCreateDropdown';

const Home = () => {
  const taskIds = useSelector(selectTaskIds, shallowEqual);

  return (
    <Layout>
      <Helmet>
        <title>All Tasks | TaskList</title>
      </Helmet>
      <TaskList label="All Tasks" list={taskIds} />
      <TaskCreateDropdown />
    </Layout>
  );
};

export default Home;
