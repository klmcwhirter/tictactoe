import { For, Match, Show, Switch } from "solid-js";
import { useAppState } from "./app.context";
import { AppModel } from "./models";

export const Toolbar = (props) => {
    const app: AppModel = useAppState();

    return (
        <header class="bg-gray-300 w-auto h-auto">
            <h1 class="font-bold text-4xl inline-block">Tic Tac Toe</h1>
            <h2 class="inline-block ml-2"><button onClick={() => app.reset()} class="btn btn-gray">new game</button></h2>
            <Show when={app.game().isComplete()}>
                <h2 class="border-2 border-purple-900 bg-purple-600 text-white inline-block text-center font-bold text-2xl rounded-lg w-32 ml-2 leading-12">{app.game().winnerString()}</h2>
            </Show>
            <h2 class="inline-block ml-2">X:</h2> {app.wins()[0]}
            <h2 class="inline-block ml-2">O:</h2> {app.wins()[1]}
            <h2 class="inline-block ml-2">Ties:</h2> {app.wins()[2]}
            <h2 class="inline-block ml-2 leading-12"><button onClick={() => app.resetWins()} class="btn btn-gray ml-2">reset wins</button></h2>
        </header>
    );
}

export const Board = (props) => {
    function isClickable(cell: string | null, complete: boolean) { return !cell && !complete; }

    const app: AppModel = useAppState();

    return (
        <div class="mt-8 mx-20">
            {/* <pre class="code">{JSON.stringify(app.game().moves)}</pre> */}
            {/* <pre class="code">{JSON.stringify(app.game().cells())}</pre> */}
            {/* <pre class="code">{JSON.stringify(app.game().winner())}</pre> */}
            {/* <pre class="code">{JSON.stringify(app.wins())}</pre> */}

            <div class="grid grid-cols-3 gap-0 w-max h-max">
                <For each={[0, 1, 2]}>{
                    (r: number, row) => <>
                        <For each={[0, 1, 2]}>{
                            (c: number, col) => {
                                const idx = (r * 3) + c;
                                return <>
                                    <Switch>
                                        <Match when={isClickable(app.game().cells()[idx], app.game().isComplete())}>
                                            <div
                                                class="w-32 min-w-32 max-w-32 h-32 min-h-32 max-h-32 border-2 border-gray-800 text-9xl text-purple-900 cursor-pointer"
                                                classList={{ 'border-t-0': r == 0, 'border-b-0': r == 2, 'border-l-0': c == 0, 'border-r-0': c == 2 }}
                                                onclick={() => app.move(idx)}>{app.game().cells()[idx]}</div>
                                        </Match>
                                        <Match when={!isClickable(app.game().cells()[idx], app.game().isComplete())}>
                                            <div
                                                class="w-32 min-w-32 max-w-32 h-32 min-h-32 max-h-32 border-2 border-gray-800 text-9xl text-purple-900 text-center"
                                                classList={{ 'border-t-0': r == 0, 'border-b-0': r == 2, 'border-l-0': c == 0, 'border-r-0': c == 2 }}
                                            >{app.game().cells()[idx]}</div>
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