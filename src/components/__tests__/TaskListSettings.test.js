import React from 'react';
import { render, screen, cleanup } from '../../utils/test-utils';
import userEvent from '@testing-library/user-event';

// component
import TaskListSettings from '../TaskListSettings';

afterEach(cleanup);

describe('TaskListSettings', () => {
  it('renders the component correctly', () => {
    render(<TaskListSettings />);
  });
  it('does not render the popup initially', () => {
    render(<TaskListSettings />);
    expect(screen.queryByText('Sort By')).toBeNull();
  });
  it('renders the popup after pressing button', () => {
    render(<TaskListSettings />);
    userEvent.click(screen.getByLabelText(/open list settings/i));
    screen.getByText('Sort By');
  });
});
