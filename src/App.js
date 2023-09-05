import { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { __getTodos } from "./redux/modules/todoSlice";

function App() {
  const dispatch = useDispatch();
  const { isLoading, error, todos } = useSelector((state) => {
    return state.todos;
  });

  useEffect(() => {
    dispatch(__getTodos());
  }, [dispatch]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      {todos.map((todo) => {
        return (
          <div key={todo.id}>
            {todo.id}&nbsp;{todo.title}
          </div>
        );
      })}
    </div>
  );
}

export default App;
