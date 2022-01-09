import React from 'react';

// redux
import { useSelector, shallowEqual } from 'react-redux';

// routing
import { useParams, Navigate } from 'react-router-dom';

// react helmet
import { Helmet } from 'react-helmet-async';

// components
import Layout from '../components/Layout';
import TaskList from '../components/TaskList';
import TaskCreateDropdown from '../components/TaskCreateDropdown';

// store
import { selectLabelIdByName } from '../store/slices/labelsSlice';
import { selectTaskIdsByLabel } from '../store/slices/listSlice';

const Label = () => {
  const { label: labelName } = useParams();
  const labelId = useSelector((state) => selectLabelIdByName(state, labelName));
  const taskIds = useSelector(
    (state) => selectTaskIdsByLabel(state, labelId),
    shallowEqual
  );

  if (!labelName || !labelId) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <Layout>
      <Helmet>
        <title>{labelName} | TaskList</title>
      </Helmet>
      <TaskList label={`Label: ${labelName}`} list={taskIds} />
      <TaskCreateDropdown defaultItem={{ label: labelId }} />
    </Layout>
  );
};

export default Label;
