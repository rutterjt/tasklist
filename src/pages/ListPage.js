import React from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// components
import Layout from '../components/Layout';
import ToDoList from '../components/ToDoList';
import AddItemForm from '../components/AddItemForm';

const ListPage = ({ list = [], label = 'To do' }) => {
  return (
    <Layout>
      <Helmet>
        <title>{`${label} | `}To Do List</title>
      </Helmet>
      <ToDoList label={label} list={list} />
      <AddItemForm />
    </Layout>
  );
};

export default ListPage;
