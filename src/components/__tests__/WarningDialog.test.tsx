import React, { useState } from 'react';
import '@testing-library/jest-dom';
import { render, screen, cleanup, waitFor } from '../../utils/test-utils';
import userEvent from '@testing-library/user-event';

// component
import { WarningDialog } from '../WarningDialog';

afterEach(cleanup);

const Component = () => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <div>
      <button onClick={() => setOpen((prev) => !prev)}>Open warning</button>
      <WarningDialog
        title="Title"
        body="Body"
        open={open}
        handleCancel={close}
        handleConfirm={close}
        cancelLabel="Cancel"
        confirmLabel="Confirm"
      />
    </div>
  );
};

describe('App', () => {
  it('correctly renders the dialog', async () => {
    render(<Component />);
    // the dialog should not initially render
    expect(screen.queryByText('Title')).not.toBeInTheDocument();

    // dialog should appear when pressing a trigger button
    userEvent.click(screen.getByText(/open warning/i));
    await waitFor(() => {
      // should correctly render the passed values
      screen.getByText('Title');
      screen.getByText('Body');
      screen.getByText('Cancel');
      screen.getByText('Confirm');
    });

    // testing the cancel button
    userEvent.click(screen.getByText('Cancel'));
    await waitFor(() => {
      expect(screen.queryByText('Title')).not.toBeInTheDocument();
    });

    // re-open the dialog to test the confirm button
    // dialog should appear when pressing a trigger button
    userEvent.click(screen.getByText(/open warning/i));
    await waitFor(() => {
      // should correctly render the passed values
      screen.getByText('Title');
    });

    // testing the confirm button
    userEvent.click(screen.getByText('Confirm'));
    await waitFor(() => {
      expect(screen.queryByText('Title')).not.toBeInTheDocument();
    });
  });
});
