import { useState } from "react";
import { useTRPC } from "../utils/trpc";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function Todo() {
  const [input, setInput] = useState<string>("");
  const trpc = useTRPC();
  const {data} =useQuery(trpc.getTodo.queryOptions())
  const addTodo =useMutation(trpc.addTodo.mutationOptions())
  // const{data} =useQuery({
  //       queryKey:["todo"],
  //       queryFn:()=>trpc.getTodo

  // })
  
  return (
    <div>
      <h2>Todo List</h2>
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Enter a task" 
      />
      <button onClick={()=>addTodo.mutate(input)}>Add</button>
      <ul>
        {data?.map((todo, index) => (
          <li key={index}>
            {todo.name} 
            <button>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
