import { createContext, createMemo, createResource, createSignal, useContext } from "solid-js";

const appContext = createContext();

export interface TicTacToeGameModel {
    winner?: number;
    moves: number[][]
}

export interface TicTacToeResponse {
    status: string;
    game: TicTacToeGameModel;
}

class TicTacToeRequestType {
    constructor(
        public oper_name: string,
        public player?: number,
        public location?: number,
        public game?: TicTacToeGameModel
    ) { }
}

async function fetchTicTacToe(type: TicTacToeRequestType): Promise<TicTacToeResponse> {
    const body = JSON.stringify(type);
    // console.log('fetchTicTacToe: body=', body);
    const rc = (await fetch("/tictactoe/api/tictactoe", {
        method: "PUT",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: body
    })).json();

    return rc;
}

let player = 0;
const players = ['X', 'O', 'Tie'];

function addMove(prev: string[], ttt?: TicTacToeResponse): string[] {
    let curr = [...prev];

    // console.log('addMove', prev, ttt, player);

    if (ttt && ttt.game.moves.length) {
        const lastMove = ttt.game.moves[ttt.game.moves.length - 1];
        curr[lastMove[1]] = players[lastMove[0]];
        player = 1 - player; // update current player
    }
    else {
        curr = Array.from(Array(9)).map((c, i) => '');
        player = 0;
    }

    // console.log('addMove: curr', curr, ttt, player);

    return curr;
}

function updateWins(wins: number[], winner?: number): number[] {
    if (winner != null) {
        wins[winner]++;
    }
    // console.log('updateWins', winner, wins);
    return [...wins];
}

export function AppContextProvider(props) {
    const [wins, setWins] = createSignal([0, 0, 0]);
    const [type, setType] = createSignal(new TicTacToeRequestType("reset"));
    const [tictactoe] = createResource(type, fetchTicTacToe);
    const cells = createMemo((prev) => addMove(prev, tictactoe()), [] as string[]);
    const winner = createMemo(() => {
        let rc = '';
        // console.log('winner: ttt:', tictactoe());
        if (tictactoe() && tictactoe()?.game.winner != null) {
            // console.log('winner: have a winner');
            const idx = tictactoe()?.game.winner || 0;
            setWins((prevWins) => updateWins(prevWins, tictactoe()?.game.winner));
            rc = idx < 2 ? `Winner: ${players[idx]}` : 'Tie!';
        }
        // else {
        //     console.log('winner: do not have a winner');
        // }
        // console.log('winner', rc);
        return rc;
    });
    const store = {
        cells,
        tictactoe,
        winner,
        wins,
        'move': (location: number, game: TicTacToeGameModel) => {
            // console.log(`move: player=${player}, location=${location}, game: `, game);
            setType(t => new TicTacToeRequestType("move", player, location, game));
        },
        'reset': () => {
            setType(t => new TicTacToeRequestType("reset"));
        },
        'resetWins': () => {
            setWins(w => [0, 0, 0]);
        }
    };

    return (
        <appContext.Provider value={store}>
            {props.children}
        </appContext.Provider>
    );
}

export function useAppState() { return useContext(appContext); }
