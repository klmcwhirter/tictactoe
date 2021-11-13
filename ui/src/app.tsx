import { Component, For, Match, Show, Switch } from "solid-js";
import { useAppState } from "./app.context";

import styles from "./app.module.css";

function isClickable(cell: string, winner: string) { return !cell && !winner; }

const App: Component = () => {
  const { cells, tictactoe, move, reset, resetWins, winner, wins } = useAppState();

  return (
    <div class="w-full h-auto leading-16">
      <header class="bg-gray-300 w-auto h-auto">
        <h1 class="font-bold text-4xl inline-block">Tic Tac Toe</h1>
        <h2 class="inline-block ml-2"><button onClick={() => reset()} class="btn btn-gray">New Game</button></h2>
        <Show when={winner()}>
          <h2 class="border-2 border-purple-900 bg-purple-600 text-white inline-block text-center font-bold text-2xl rounded-lg w-32 ml-2 leading-12">{winner()}</h2>
        </Show>
        <h2 class="inline-block ml-2">X:</h2> {wins()[0]}
        <h2 class="inline-block ml-2">O:</h2> {wins()[1]}
        <h2 class="inline-block ml-2">Ties:</h2> {wins()[2]}
        <h2 class="inline-block ml-2 leading-12"><button onClick={() => resetWins()} class="btn btn-gray ml-2"><span>reset wins</span></button></h2>
      </header>

      <div class="">
        <div class="mt-8 mx-20">
          {/* <pre class="code">{JSON.stringify(tictactoe())}</pre> */}
          {/* <pre class="code">{JSON.stringify(cells())}</pre> */}
          {/* <pre class="code">{JSON.stringify(wins())}</pre> */}

          <table class="border-collapse">
            <For each={[0, 1, 2]}>{
              (r: number, row) =>
                <tr>
                  <For each={[0, 1, 2]}>{
                    (c: number, col) => {
                      const idx = (r * 3) + c;
                      return <>
                        <Switch>
                          <Match when={isClickable(cells()[idx], winner())}>
                            <td
                              class="w-32 min-w-32 max-w-32 h-32 min-h-32 max-w-32 border-2 border-gray-800 text-9xl text-purple-900 cursor-pointer"
                              onclick={() => move(idx, tictactoe().game)}>{cells()[idx]}</td>
                          </Match>
                          <Match when={!isClickable(cells()[idx], winner())}>
                            <td class="w-32 min-w-32 max-w-32 h-32 min-h-32 max-w-32 border-2 border-gray-800 text-9xl text-purple-900 text-center">{cells()[idx]}</td>
                          </Match>
                        </Switch>
                      </>;
                    }
                  }</For>
                </tr>
            }</For>
          </table>
        </div>
      </div>
    </div >
  );
};

export default App;
