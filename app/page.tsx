"use client"
import { use, useEffect, useState } from "react";
import { checkTodo, createTodo, deleteTodo, listarTarefas } from "./api/todo/route";


type Todo = {
  id?: number;
  text: string;
  completed: boolean;
}

export default function Home() {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");


  const listarTodos = async () => {
    await listarTarefas()

    useEffect(() => {
      listarTarefas();
    }, []);
    setTodos(await listarTarefas());
  }


  const novaTarefa = async () => {
    const texto = input.trim();
    if(!texto) return;

    const tarefa: Todo = {
      text: texto,
      completed: false
    };

    const savedTask = await createTodo(tarefa.text, tarefa.completed);

    setTodos((todos) => [...todos, savedTask]);
    setInput("");

  };

  const deletarTarefa = async (id: number) => {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
  };

  const concluiTarefa =  async (id: number) => {
    const check = await checkTodo(id, !todos.find(todo => todo.id === id)?.completed);
    useEffect(() => {
        checkTodo(id, !todos.find(todo => todo.id === id)?.completed);
    }, [id]);
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: check.completed } : todo));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 ">
      <div className="bg-white shadow-lg rounded-3xl p-16">
        <h1 className="text-3xl font-bold text-center mb-6">ToDo List</h1>
        <div className="mb-4 flex">
          <input value={input} onChange={(e) => setInput(e.target.value)}
           type="text" className="flex px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2
            focus:ring-blue-500" placeholder="adicionar uma tarefa"/>

          <button onClick={novaTarefa} className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600">Adicionar</button>
        </div>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id}>
              <input type="checkbox" onClick={() => concluiTarefa(todo.id ? todo.id : 0)} className="mr-2"/>
              {todo.text} - {todo.completed ? "Concluída" : "Pendente"}
              <button onClick={() => deletarTarefa(todo.id ? todo.id : 0)} className="ml-30 bg-red-500 text-white py-1 px-1 hover:bg-red-600">Deletar</button>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
}
