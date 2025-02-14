import { For, Match, Show, Switch } from "solid-js";
import { useAppState } from "./app.context";

export const Toolbar = (props) => {
    const { move, reset, resetWins, moves, cells, winner, wins } = useAppState();

    return (
        <header class="bg-gray-300 w-auto h-auto">
            <h1 class="font-bold text-4xl inline-block">Tic Tac Toe</h1>
            <h2 class="inline-block ml-2"><button onClick={() => reset()} class="btn btn-gray">new game</button></h2>
            <Show when={winner()}>
                <h2 class="border-2 border-purple-900 bg-purple-600 text-white inline-block text-center font-bold text-2xl rounded-lg w-32 ml-2 leading-12">{winner()}</h2>
            </Show>
            <h2 class="inline-block ml-2">X:</h2> {wins()[0]}
            <h2 class="inline-block ml-2">O:</h2> {wins()[1]}
            <h2 class="inline-block ml-2">Ties:</h2> {wins()[2]}
            <h2 class="inline-block ml-2 leading-12"><button onClick={() => resetWins()} class="btn btn-gray ml-2">reset wins</button></h2>
        </header>
    );
}

export const Board = (props) => {
    function isClickable(cell: string, winner: string) { return !cell && !winner; }

    const { move, reset, resetWins, moves, cells, winner, wins } = useAppState();

    return (
        <div class="mt-8 mx-20">
            {/* <pre class="code">{JSON.stringify(moves())}</pre> */}
            {/* <pre class="code">{JSON.stringify(cells())}</pre> */}
            {/* <pre class="code">{JSON.stringify(wins())}</pre> */}

            <div class="grid grid-cols-3 gap-0 w-max h-max">
                <For each={[0, 1, 2]}>{
                    (r: number, row) => <>
                        <For each={[0, 1, 2]}>{
                            (c: number, col) => {
                                const idx = (r * 3) + c;
                                return <>
                                    <Switch>
                                        <Match when={isClickable(cells()[idx], winner())}>
                                            <div
                                                class="w-32 min-w-32 max-w-32 h-32 min-h-32 max-h-32 border-2 border-gray-800 text-9xl text-purple-900 cursor-pointer"
                                                classList={{ 'border-t-0': r == 0, 'border-b-0': r == 2, 'border-l-0': c == 0, 'border-r-0': c == 2 }}
                                                onclick={() => move(idx)}>{cells()[idx]}</div>
                                        </Match>
                                        <Match when={!isClickable(cells()[idx], winner())}>
                                            <div
                                                class="w-32 min-w-32 max-w-32 h-32 min-h-32 max-h-32 border-2 border-gray-800 text-9xl text-purple-900 text-center"
                                                classList={{ 'border-t-0': r == 0, 'border-b-0': r == 2, 'border-l-0': c == 0, 'border-r-0': c == 2 }}
                                            >{cells()[idx]}</div>
                                        </Match>
                                    </Switch>
                                </>;
                            }
                        }</For>
                    </>
                }
                </For>
            </div>

        </div>
    );
}