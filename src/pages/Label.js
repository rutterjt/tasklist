import React from 'react';

// lodash
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

// routing
import { useParams, Navigate } from 'react-router-dom';

// react helmet
import { Helmet } from 'react-helmet-async';

// components
import Layout from 'components/Layout';
import TaskList from 'components/TaskList';
import TaskCreateForm from 'components/forms/TaskCreateForm';

// store
import { useStore } from 'store/useStore';

const hasLabel = (label) => (listItem) =>
  get(listItem, 'label.name', null) === get(label, 'name');

const Label = () => {
  const { list, labels } = useStore();
  const { label: paramLabelName } = useParams();

  const label = labels.find((label) => label.name === paramLabelName);
  const filteredList = list.filter(hasLabel(label));

  if (!label || isEmpty(label)) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <Layout>
      <Helmet>
        <title>{label.name} | To Do List</title>
      </Helmet>
      <TaskList label={`Label: ${label.name}`} list={filteredList} />
      <TaskCreateForm defaultItem={{ label: label }} />
    </Layout>
  );
};

export default Label;
