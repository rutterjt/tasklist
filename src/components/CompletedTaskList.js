import React from 'react';

// mui
import { List, Typography, Box, Collapse, Divider } from '@mui/material';

// transition group
import { TransitionGroup } from 'react-transition-group';

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
          <TransitionGroup>
            {list.map((task) => (
              <Collapse key={task.id}>
                <CompletedTask task={task} />
                <Divider component="li" sx={{ ml: 7 }} />
              </Collapse>
            ))}
          </TransitionGroup>
        </List>
      )}
    </Box>
  );
};

export default CompletedTaskList;
