import { createContext, createMemo, createSignal, useContext } from "solid-js";
import { Move, WaysToWin } from "./models";


const players = ['X', 'O', 'Tie'];

function initialCells(): (string | null)[] {
    return [null, null, null, null, null, null, null, null, null];
}

let gameWinner: number | undefined;

function updateWins(wins: number[], winner?: number): number[] {
    if (winner != null) {
        wins[winner]++;
    }
    console.log('updateWins', winner, wins);
    return [...wins];
}

const appContext = createContext();

export function AppContextProvider(props) {
    const [player, setPlayer] = createSignal<number>(0);
    const [moves, setMoves] = createSignal<Move[]>([]);
    const [cells, setCells] = createSignal<(string | null)[]>(initialCells());
    const isComplete = createMemo<boolean>(() => {
        // console.log('isComplete')
        const _cells = cells();
        for (let w2w of WaysToWin) {
            const val = _cells[w2w[0]];
            if (val !== null && w2w.every((i: number) => _cells[i] === val)) {
                console.log('isComplete: winner detected=', val);
                gameWinner = players.indexOf(val);
                return true;
            }
        }
        if (moves().length >= 9) {
            console.log('isComplete: tie detected=', moves().length);

            gameWinner = 2;  // tie
            return true;
        }
        // console.log('isComplete: no winner detected');
        return false;
    });
    const [wins, setWins] = createSignal([0, 0, 0]);
    const winner = createMemo(() => {
        let rc = '';

        if (isComplete() && gameWinner !== undefined) {
            // console.log('winner: have a winner');
            // console.log('winner: gameWinner=', gameWinner);
            setWins((prevWins) => updateWins(prevWins, gameWinner));
            rc = gameWinner < 2 ? `Winner: ${players[gameWinner]}` : 'Tie!';
        }
        // else {
        //     console.log('winner: do not have a winner');
        // }
        // console.log('winner: rc=', rc);

        return rc;
    });

    function _cellsFrom(moves: Move[]) {
        const _cells = initialCells();
        for (let m of moves) {
            _cells[m.cell] = players[m.player];
        }
        // console.log('cellsFrom: _cells=', _cells);
        return _cells;
    }

    function move(cell: number) {
        console.log(`move: player=${player()}, cell=${cell}`);

        if (!isComplete()) {
            const _moves = moves();
            _moves.push(new Move(player(), cell));
            setMoves([..._moves]);
            setCells(() => _cellsFrom(_moves));
            setPlayer(1 - player());
        }
    }

    function reset() {
        console.log('reset');
        setPlayer(0);
        setCells(initialCells());
        setMoves([]);
        gameWinner = undefined;
    }

    function resetWins() {
        console.log('resetWins');
        setWins([0, 0, 0]);
    }

    const gameModel = {
        move,
        reset,
        resetWins,

        moves,
        cells,
        winner,
        wins
    };

    return (
        <appContext.Provider value={gameModel}>
            {props.children}
        </appContext.Provider>
    );
}

export function useAppState() { return useContext(appContext); }
