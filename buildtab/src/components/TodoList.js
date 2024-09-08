import React, { useState, useEffect } from 'react';
import Todo from './Todo';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [value, setValue] = useState("");

    useEffect(() => {
        window.chrome.storage.local.get("todos", (result) => {
            if (result.todos) {
                setTodos(result.todos);
            }
        });
    }, []);

    useEffect(() => {
        window.chrome.storage.local.set({ todos });
    }, [todos]);

    const addTodo = () => {
        if (!value) return;
        const newTodos = [...todos, { text: value, isCompleted: false }];
        setTodos(newTodos);
        setValue("");
    };

    const completeTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].isCompleted = !newTodos[index].isCompleted;
        setTodos(newTodos);
    };

    const removeTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    return (
        <div className="todo-list">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Add a new task"
            />
            <button onClick={addTodo}>Add</button>
            {todos.map((todo, index) => (
                <Todo
                    key={index}
                    index={index}
                    todo={todo}
                    completeTodo={completeTodo}
                    removeTodo={removeTodo}
                />
            ))}
        </div>
    );
}

export default TodoList;
