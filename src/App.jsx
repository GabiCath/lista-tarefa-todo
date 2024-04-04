import { useState } from 'react'

import Todo from './components/Todo';
import TodoForm from './components/TodoForm';
import Search from './components/Search';

import "./App.css";
import Filter from './components/Filter';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Realizar o projeto do trabalho",
      category: "Trabalho",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Comer um omelete ao acordar",
      category: "Pessoal",
      isCompleted: false,
    },
    {
      id: 3,
      text: "Estudar as vídeos aulas da disciplina de segunda",
      category: "Estudos",
      isCompleted: false,
    },
    {
      id: 4,
      text: "Entrar no LinkedIn e interagir nos posts",
      category: "Produtividade",
      isCompleted: false,
    }
  ]);

  const [search, setSearch] = useState("");

  const[filter, setFilter] = useState("All");

  const[sort, setSort] = useState("Asc");

  const addTodo = (text, category) => {

    const newTodos = [
      ...todos,
      {
      id: Math.floor(Math.random() * 10000),
      text,
      category,
      isCompleted: false,
      },
    ];

    setTodos(newTodos);
  };

  const removeTodo = (id) => {
    const newTodos = [...todos]
    const filteredTodos = newTodos.filter(todo => 
      todo.id !== id ? todo : null
      );
      setTodos(filteredTodos);
  };

  const completeTodo = (id) => {
    const newTodos = [...todos]
    newTodos.map((todo) => todo.id === id ? todo.isCompleted = !todo.isCompleted : todo
    );
    setTodos(newTodos);
  };

  return (
  <div className="app">
    <h1>Minha lista de tarefas: </h1>
    <Search search={search} setSearch={setSearch} />
    <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
    <div className="todo-list">
    {todos.filter((todo) => 
    filter === "All" 
    ? true
    : filter === "Completed" 
    ? todo.isCompleted 
    : !todo.isCompleted
    )
      .filter((todo) => 
      todo.text.toLowerCase().includes(search.toLowerCase())
      )
      .filter(todo => todo.text.toLowerCase().includes(search.toLowerCase()))
          .sort((a, b) => sort === "Asc" 
          ? a.text.localeCompare(b.text)
          : b.text.localeCompare(a.text)
          )
          .map((todo) => (
              <Todo 
                  key={todo.id}
                  todo={todo} 
                  removeTodo={removeTodo} 
                  completeTodo={completeTodo}
              />
          ))
        };
</div>
    <TodoForm addTodo={addTodo}/>
</div>
  );
}
export default App;
