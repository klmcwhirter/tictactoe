import { Component } from "solid-js";
import { Board, Toolbar } from "./components";


const App: Component = () => {
  return (
    <div class="w-full h-auto leading-16">
      <Toolbar />

      <div class="">
        <Board />
      </div>
    </div >
  );
};

export default App;
