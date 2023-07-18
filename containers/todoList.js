import TodoItem from "../components/todoItem";
function TodoList({ todos, editTodoItem, deleteTodoItem}){
    return (
        <div className="todoListContainer">
            <div className="todosText">Todos</div>
            {todos?.map((todo) =>
                <TodoItem
                    todo={todo}
                    key={todo.id}
                    deleteTodoItem={deleteTodoItem}
                    editTodoItem={editTodoItem}
                />
            )}
        </div>
    );
}
export default TodoList;

