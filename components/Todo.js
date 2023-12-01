import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import EditTodo from './EditTodo';

const Todo = ({ todos, addTodo, updateTodo, deleteTodo }) => {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Done',
    priority: 'High'
  });
  const [editIndex, setEditIndex] = useState(null);
  const [showEditScreen, setShowEditScreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All'); 
  const [statusFilter, setStatusFilter] = useState('All'); 

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleCreateTodo = () => {
    setShowForm(true);
    setFormData({
      title: '',
      description: '',
      status: 'Done',
      priority: 'High'
    });
    setEditIndex(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.title.trim() === '' || formData.description.trim() === '') {
      alert('Please fill in all fields.');
      return;
    }

    if (editIndex !== null) {
      updateTodo(formData, editIndex);
    } else {
      addTodo(formData);
    }

    setFormData({
      title: '',
      description: '',
      status: 'Done',
      priority: 'High'
    });

    setShowForm(false);
    setEditIndex(null);
  };

  const handleEditTodo = (index) => {
    setFormData(todos[index]);
    setEditIndex(index);
    setShowEditScreen(true);
  };

  const handleSaveEditedTodo = (editedTodo) => {
    updateTodo(editedTodo, editIndex);
    setShowEditScreen(false);
  };

  const handleCancelEdit = () => {
    setShowForm(false);
    setShowEditScreen(false);
  };

  const handleDeleteTodo = (index) => {
    deleteTodo(index);
  };


  const filteredTodos = todos.filter((todo) => {
    if (!todo) {
      return false; 
    }

    const matchesSearch =
      (todo.title && todo.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (todo.description && todo.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesPriority = priorityFilter === 'All' || (todo.priority && todo.priority === priorityFilter);
    const matchesStatus = statusFilter === 'All' || (todo.status && todo.status === statusFilter);

    return matchesSearch && matchesPriority && matchesStatus;
  });


  return (
    <div className="p-4 mx-auto max-w-lg md:ml-0 md:max-w-full md:pl-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Todo App</h2>
      {showForm ? (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Create Todo</h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-100 p-8 rounded-lg shadow-md"
          >
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter Title"
                className="lg:w-1/3 md:w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-2">
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter Description"
                className="lg:w-1/3 md:w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-6">
              <p className="block text-sm font-bold text-gray-700 mb-2">Status</p>
              <div className="flex space-x-4">
                {['In-Progress', 'Done', 'Not Started Yet'].map((status) => (
                  <label key={status} className="flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="status"
                      value={status}
                      checked={formData.status === status}
                      onChange={handleChange}
                    />
                    <span className="ml-2">{status}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <p className="block text-sm font-bold text-gray-700 mb-2">Priority</p>
              <div className="flex space-x-4">
                {['High', 'Medium', 'Low'].map((priority) => (
                  <label key={priority} className="flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="priority"
                      value={priority}
                      checked={formData.priority === priority}
                      onChange={handleChange}
                    />
                    <span className="ml-2">{priority}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 w-full md:w-auto"
              >
                Save Todo
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 w-full md:w-auto"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="mt-20 text-center">
          <div className="md:flex md:justify-between md:items-center">
            <div className="mb-4 md:mb-0">
              <input
                type="text"
                placeholder="Search by title or description"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-2 p-2 border rounded-md w-full md:w-auto"
              />
            </div>

            <div className="md:flex space-x-2">
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="mb-2 md:mb-0 p-2 border rounded-md"
              >
                <option value="All">All</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="mb-2 md:mb-0 p-2 border rounded-md"
              >
                <option value="All">All</option>
                <option value="In-Progress">In Progress</option>
                <option value="Done">Done</option>
                <option value="Not Started Yet">Not Started Yet</option>
              </select>
            </div>
          </div>
          <div className='mt-8'>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full md:w-auto"
              onClick={handleCreateTodo}
            >
              Create Button
            </button>
          </div>

          {filteredTodos.length > 0 && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTodos.map((todo, index) => (
                <div key={index} className="bg-white p-6 border border-gray-200 rounded-lg shadow-md">
                  <h2 className="text-gray-700 mb-4 text-xl font-bold">
                    Title: {todo.title}
                  </h2>
                  <h4 className="text-gray-600 mb-4 font-semibold">
                    Description: {todo.description}
                  </h4>
                  <p className="text-gray-600 mb-2">Status: {todo.status}</p>
                  <p className="text-gray-600 mb-2">Priority: {todo.priority}</p>
                  <div className="flex flex-wrap justify-center mt-4 space-x-2">
                    <button
                      className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 w-full md:w-auto mb-2 md:mb-0  "
                      onClick={() => handleEditTodo(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 w-full md:w-auto mb-2 md:mb-0"
                      onClick={() => handleDeleteTodo(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredTodos.length === 0 && (
            <div className="mt-8 py-3 border border-solid border-slate-600">
              <h2 className="text-gray-500 mb-4 text-xl">
                No Task found, please add a task.
              </h2>
            </div>
          )}
        </div>
      )}
      {showEditScreen && (
        <EditTodo
          todo={todos[editIndex]}
          onSave={handleSaveEditedTodo}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todos,
});

const mapDispatchToProps = (dispatch) => ({
  addTodo: (todo) => dispatch({ type: 'ADD_TODOS', payload: todo }),
  updateTodo: (todo, index) => dispatch({ type: 'UPDATE_TODOS', payload: { todo, index } }),
  deleteTodo: (index) => dispatch({ type: 'DELETE_TODOS', payload: index }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);

