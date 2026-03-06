"use client"
import { useState } from "react";


type Todo = {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const tarefa = () => {
    const texto = input.trim();
    if(!texto) return;

    const novaTarefa: Todo = {
      id: Date.now(),
      text: texto,
      completed: false
    };

    setTodos([...todos, novaTarefa]);
    setInput("");

  };

  const deletaTarefa = (id: number) => {
      setTodos(todos.filter(todo => todo.id !== id));
  };

  const concluiTarefa = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? {...todo, completed: !todo.completed} : todo
    ));
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 ">
      <div className="bg-white shadow-lg rounded-3xl p-16">
        <h1 className="text-3xl font-bold text-center mb-6">ToDo List</h1>
        <div className="mb-4 flex">
          <input value={input} onChange={(e) => setInput(e.target.value)}
           type="text" className="flex px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2
            focus:ring-blue-500" placeholder="adicionar uma tarefa"/>

          <button onClick={tarefa} className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600">Adicionar</button>
        </div>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id}>
              <input type="radio" onClick={() => concluiTarefa(todo.id)} className="mr-2" checked={todo.completed}/>
              {todo.text} - {todo.completed ? "Concluído" : "Pendente"}
              <button onClick={() => deletaTarefa(todo.id)} className=" bg-red-500 text-white py-1 hover:bg-red-600">Deletar</button>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
}
