"use client";
import { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    setLoading(true);
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data);
    setLoading(false);
  }

  async function addTodo(e: React.FormEvent) {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setLoading(true);
    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTodo }),
    });
    setNewTodo("");
    fetchTodos();
  }

  async function removeTodo(id: number) {
    setLoading(true);
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    fetchTodos();
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-12">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">My Todo List</h1>
        <form onSubmit={addTodo} className="flex mb-6 gap-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Add a new todo..."
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            Add
          </button>
        </form>
        <ul className="space-y-3">
          {todos.length === 0 && (
            <li className="text-gray-400 text-center">No todos yet.</li>
          )}
          {todos.map(todo => (
            <li key={todo.id} className="flex items-center justify-between bg-gray-100 rounded px-3 py-2">
              <span className={todo.completed ? "line-through text-gray-400" : ""}>{todo.title}</span>
              <button
                onClick={() => removeTodo(todo.id)}
                className="text-red-500 hover:text-red-700 transition"
                disabled={loading}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
