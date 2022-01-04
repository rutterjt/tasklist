import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TaskListSettings from '../TaskListSettings';

// store
import { useStore } from '../../store/useStore';
import * as ACTIONS from '../../store/actions';

jest.mock('../../store/useStore');

afterEach(cleanup);

describe('TaskListSettings', () => {
  it('renders the component correctly', () => {
    useStore.mockReturnValue({ dispatch: jest.fn(), sortBy: 'Default' });
    render(<TaskListSettings />);
  });
  it('does not render the popup initially', () => {
    useStore.mockReturnValue({ dispatch: jest.fn(), sortBy: 'Default' });
    render(<TaskListSettings />);

    expect(screen.queryByText('Sort By')).toBeNull();
  });
  it('renders the popup after pressing button', () => {
    useStore.mockReturnValue({ dispatch: jest.fn(), sortBy: 'Default' });
    render(<TaskListSettings />);

    userEvent.click(screen.getByLabelText('open list settings'));
    screen.getByText('Sort By');
  });
  it('calls dispatch correctly', () => {
    const mockDispatch = jest.fn();
    useStore.mockReturnValue({ dispatch: mockDispatch, sortBy: 'Default' });
    render(<TaskListSettings />);

    userEvent.click(screen.getByLabelText('open list settings'));
    userEvent.click(screen.getByText('Alphabetically'));

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: ACTIONS.CHANGE_SORT_ORDER,
      payload: 'alphabetically',
    });
  });
});
