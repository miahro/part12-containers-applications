import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Todo from '../Todos/Todo';

const mockDeleteTodo = jest.fn();
const mockCompleteTodo = jest.fn();

const sampleTodo = {
  _id: '1',
  text: 'Sample Todo',
  done: false,
};

describe('Todo Component', () => {
  it('renders Todo component correctly when todo is not done', () => {
    render(
      <Todo todo={sampleTodo} deleteTodo={mockDeleteTodo} completeTodo={mockCompleteTodo} />
    );
    
    // start view
    expect(screen.getByText('Sample Todo')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Set as done')).toBeInTheDocument();
    expect(mockDeleteTodo).not.toHaveBeenCalled();
    expect(mockCompleteTodo).not.toHaveBeenCalled();
    
    //break on purpose
    //expect(screen.getByText('No such text here')).toBeInTheDocument();

    // click delete
    fireEvent.click(screen.getByText('Delete'));
    expect(mockDeleteTodo).toHaveBeenCalledWith(sampleTodo);
    expect(mockCompleteTodo).not.toHaveBeenCalled();

    //complete
    fireEvent.click(screen.getByText('Set as done'));
    expect(mockCompleteTodo).toHaveBeenCalledWith(sampleTodo);
  });

  it('renders Todo component correctly when todo is done', () => {
    const doneTodo = { ...sampleTodo, done: true };
    render(
      <Todo todo={doneTodo} deleteTodo={mockDeleteTodo} completeTodo={mockCompleteTodo} />
    );


    expect(screen.getByText('Sample Todo')).toBeInTheDocument();
    expect(screen.getByText('This todo is done')).toBeInTheDocument();
    expect(screen.queryByText('Set as done')).toBeNull();

    // delete
    fireEvent.click(screen.getByText('Delete'));
    expect(mockDeleteTodo).toHaveBeenCalledWith(doneTodo);
    expect(mockCompleteTodo).not.toHaveBeenCalled();
  });
});