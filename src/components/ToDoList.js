import React from 'react';
import { List } from '@mui/material';

import ToDoItem from './ToDoItem';

const ToDoList = ({ list }) => {
  return (
    <div>
      <List
        sx={{
          width: '100%',
          maxWidth: 400,
          margin: 'auto',
        }}
      >
        {list.map((item) => (
          <ToDoItem key={item.id} {...item} />
        ))}
      </List>
    </div>
  );
};

export default ToDoList;
