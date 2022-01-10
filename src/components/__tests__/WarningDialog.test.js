import React from 'react';
import { render, screen, cleanup } from '../../utils/test-utils';

// component
import WarningDialog from '../WarningDialog';

afterEach(cleanup);

const Component = (
  <WarningDialog
    title="Title"
    body="Body"
    open={true}
    handleCancel={() => true}
    handleConfirm={() => true}
    cancelLabel="Cancel"
    confirmLabel="Confirm"
  />
);

describe('App', () => {
  it('renders the component', () => {
    render(Component);
  });
  it('renders the correct content', () => {
    render(Component);

    screen.getByText('Title');
    screen.getByText('Body');
    screen.getByText('Cancel');
    screen.getByText('Confirm');
  });
});
