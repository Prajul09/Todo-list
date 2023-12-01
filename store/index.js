import { createStore } from 'redux';
import { Provider } from 'react-redux';

const initialState = {
  todos: [],
};

const reducer = (state = initialState, action) => {
  let updatedTodos;

  switch (action.type) {
    case 'ADD_TODOS':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case 'UPDATE_TODOS':
      updatedTodos = [...state.todos];
      updatedTodos[action.payload.index] = action.payload.todo;
      return {
        ...state,
        todos: updatedTodos,
      };
    case 'DELETE_TODOS':
      updatedTodos = state.todos.filter((todo, index) => index !== action.payload);
      return {
        ...state,
        todos: updatedTodos,
      };
    default:
      return state;
  }
};


const store = createStore(reducer);

export const StoreProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
