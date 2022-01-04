import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// component
import UndoAlert from '../UndoAlert';

// store
import { useStore } from '../../store/useStore';
import * as ACTIONS from '../../store/actions';

jest.mock('../../store/useStore');

afterEach(cleanup);

describe('UndoAlert', () => {
  it('renders the component correctly', () => {
    useStore.mockReturnValue({ dispatch: jest.fn() });

    render(<UndoAlert open={true} handleClose={jest.fn()} id="123" />);

    screen.getByText('Task completed!');
  });

  it('runs handleClose on button click', () => {
    useStore.mockReturnValue({ dispatch: jest.fn() });

    const handleClose = jest.fn();

    render(<UndoAlert open={true} handleClose={handleClose} id="123" />);

    userEvent.click(screen.getByRole('button'));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
  it('calls dispatch correctly on button click', () => {
    const mockDispatch = jest.fn();
    useStore.mockReturnValue({ dispatch: mockDispatch });

    const id = '123';
    render(<UndoAlert open={true} handleClose={jest.fn()} id={id} />);

    userEvent.click(screen.getByRole('button'));

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: ACTIONS.RESTORE_TASK,
      payload: id,
    });
  });
});
