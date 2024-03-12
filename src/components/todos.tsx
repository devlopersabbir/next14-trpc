"use client";

import { trpc } from "@/tRPC/client";
import React from "react";

const Todos = () => {
  const { data } = trpc.index.useQuery();
  console.log("todos: ", data);
  return <div>todos</div>;
};

export default Todos;
