
import React from 'react';

const EditTodo = ({ todo, onSave, onCancel }) => {
  const [formData, setFormData] = React.useState(todo || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="mt-8 p-4 mx-auto max-w-md bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Todo</h2>
      <form className="flex flex-col space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            name="title"
            value={formData?.title || ''}
            onChange={handleChange}
            placeholder="Enter Title"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <input
            className="border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            type="text"
            name="description"
            value={formData?.description || ''}
            onChange={handleChange}
            placeholder="Enter Description"
            required
          />
        </div>
        <div>
          <p className="block text-gray-700 text-sm font-bold mb-2">Status</p>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="status"
                value="In-Progress"
                checked={formData.status === 'In-Progress'}
                onChange={handleChange}
              />
              <span className="ml-2">In Progress</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="status"
                value="Done"
                checked={formData.status === 'Done'}
                onChange={handleChange}
              />
              <span className="ml-2">Done</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="status"
                value="Not Started Yet"
                checked={formData.status === 'Not Started Yet'}
                onChange={handleChange}
              />
              <span className="ml-2">Not Started Yet</span>
            </label>
          </div>
        </div>
        <div>
          <p className="block text-gray-700 text-sm font-bold mb-2">Priority</p>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="priority"
                value="High"
                checked={formData.priority === 'High'}
                onChange={handleChange}
              />
              <span className="ml-2">High</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="priority"
                value="Medium"
                checked={formData.priority === 'Medium'}
                onChange={handleChange}
              />
              <span className="ml-2">Medium</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="priority"
                value="Low"
                checked={formData.priority === 'Low'}
                onChange={handleChange}
              />
              <span className="ml-2">Low</span>
            </label>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 w-full"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 w-full"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTodo;
