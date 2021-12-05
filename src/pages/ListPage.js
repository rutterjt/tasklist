import React from 'react';

// components
import Layout from '../components/Layout';
import ToDoList from '../components/ToDoList';
import AddItemForm from '../components/AddItemForm';

const ListPage = ({ list = [], label = 'To do' }) => {
  return (
    <Layout>
      <ToDoList label={label} list={list} />
      <AddItemForm />
    </Layout>
  );
};

export default ListPage;
