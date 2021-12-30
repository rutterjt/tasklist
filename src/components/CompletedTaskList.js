import React from 'react';

// mui
import { List, Typography, Box } from '@mui/material';

// components
import CompletedTask from './CompletedTask';

const CompletedTaskList = ({ list = [], label = 'Completed tasks' }) => {
  return (
    <Box sx={{ pt: 1 }}>
      <Typography variant="h6" component="h2">
        {list.length <= 0 ? 'No completed tasks' : label}
      </Typography>
      {list.length > 0 && (
        <List>
          {list.map((task) => (
            <CompletedTask key={task.id} task={task} />
          ))}
        </List>
      )}
    </Box>
  );
};

export default CompletedTaskList;
