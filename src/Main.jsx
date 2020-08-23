import React from "react";
import { Todos } from "./components/Todos";
import { Header } from "./components/Header";
export default function Main() {
  return (
    <div>
      <Header />

      <Todos />
    </div>
  );
}
