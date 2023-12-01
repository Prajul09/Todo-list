import React, { useState } from 'react';
import Todo from '@/components/Todo';

const Home = () => {
  const [todos, setTodos] = useState([]);
  return (
    <div>
      <Todo todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default Home;









