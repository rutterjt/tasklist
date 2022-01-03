import React from 'react';

// proptypes
import PropTypes from 'prop-types';

// mui
import { ListItem, ListItemText } from '@mui/material';

const ListHeader = ({ children }) => {
  return (
    <ListItem>
      <ListItemText>
        <span style={{ fontWeight: 'bold' }}>{children}</span>
      </ListItemText>
    </ListItem>
  );
};

ListHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ListHeader;
