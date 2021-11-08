import { Component, createEffect, For, Match, Show, Switch } from "solid-js";
import { useAppState } from "./app.context";

import styles from "./app.module.css";

function isClickable(cell: string, winner: string) { return !cell && !winner; }

const App: Component = () => {
  const { cells, tictactoe, move, reset, resetWins, winner, wins } = useAppState();

  return (
    <div class={styles.app}>
      <header class={styles.header}>
        <h1>Tic Tac Toe</h1>
        <h2><button onClick={() => reset()}>New Game</button></h2>
        <Show when={winner()}>
          <h2 class="winner">{winner()}</h2>
        </Show>
        <h2>X:</h2> {wins()[0]}
        <h2>O:</h2> {wins()[1]}
        <h2>Ties:</h2> {wins()[2]}
        <button onClick={() => resetWins()}>reset<br />wins</button>
      </header>

      <div class={styles.dashboard}>
        <div class={styles.game}>
          {/* <pre class="code">{JSON.stringify(tictactoe())}</pre> */}
          {/* <pre class="code">{JSON.stringify(cells())}</pre> */}
          {/* <pre class="code">{JSON.stringify(wins())}</pre> */}

          <table class={styles.centered}>
            <For each={[0, 1, 2]}>{
              (r: number, row) =>
                <tr>
                  <For each={[0, 1, 2]}>{
                    (c: number, col) => {
                      const idx = (r * 3) + c;
                      return <>
                        <Switch>
                          <Match when={isClickable(cells()[idx], winner())}><td classList={{ cell: true, clickableCell: true }} onClick={() => move(idx, tictactoe().game)}>{cells()[idx]}</td></Match>
                          <Match when={!isClickable(cells()[idx], winner())}><td classList={{ cell: true }}>{cells()[idx]}</td></Match>
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
