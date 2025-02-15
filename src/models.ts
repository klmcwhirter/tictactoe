import { Accessor, createSignal, Setter } from "solid-js";

export class Move {
    constructor(
        public player: number,
        public cell: number
    ) {
    }
}

const INITIAL_CELLS: (string | null)[] = [null, null, null, null, null, null, null, null, null];
const PLAYERS = ['X', 'O', 'Tie'];

const WAYS2WIN = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

export class GameModel {
    app: AppModel;
    _deinit = false;

    cells: Accessor<(string | null)[]>;
    player: Accessor<number>;

    _setCells: Setter<(string | null)[]>;
    _setPlayer: Setter<number>;

    moves: Move[];
    winner: Accessor<number | null>;
    _setWinner: Setter<number | null>;

    constructor(app: AppModel) {
        this.app = app;
        [this.player, this._setPlayer] = createSignal(0);
        [this.cells, this._setCells] = createSignal([...INITIAL_CELLS]);
        [this.winner, this._setWinner] = createSignal<number | null>(null);

        this.moves = [];
    }

    deinit() {
        console.debug('reset');
        queueMicrotask(() => {
            this._deinit = true;
            this._setWinner(null);

            this._setCells([...INITIAL_CELLS]);
            this._setPlayer(0);
            this.moves = [];
        });
    }

    _cellsFrom(moves: Move[]) {
        const _cells = [...INITIAL_CELLS];
        for (let m of moves) {
            _cells[m.cell] = PLAYERS[m.player];
        }
        console.debug('cellsFrom: _cells=', _cells);
        return _cells;
    }

    _detectWinner(): number | null {
        console.debug('_detectWinner: winner=', this.winner(), '_deinit=', this._deinit);

        if (this.winner() !== null || this._deinit) {
            return this.winner();
        }

        const _cells = this.cells();

        for (let w2w of WAYS2WIN) {
            const val = _cells[w2w[0]];
            if (val !== null && w2w.every((i: number) => _cells[i] === val)) {
                console.debug('_detectWinner: winner detected=', val);
                return PLAYERS.indexOf(val);
            }
        }

        if (this.moves.length >= 9) {
            console.debug('_detectWinner: tie detected=', this.moves.length);

            return 2;  // tie
        }

        console.debug('_detectWinner: no winner detected');
        return null;
    }

    isComplete(): boolean {
        return this.winner() !== null;
    }

    move(cell: number) {
        console.debug(`move: player=${this.player()}, cell=${cell}`);

        if (this._deinit) {
            return;
        }

        if (this.cells()[cell] !== null) {
            console.error(`Cell ${cell} is occupied`);
            return;
        }

        console.debug('move: before winner=', this.winner());

        if (this.winner() === null) {
            const _moves = [...this.moves];
            _moves.push(new Move(this.player(), cell));
            this.moves = _moves;
            this._setCells(this._cellsFrom(_moves));
            this._setWinner(this._detectWinner());
            this._setPlayer(1 - this.player());
        }

        console.debug('move: game=', this);
    }

    winnerString(): string {
        let rc = '';

        if (this._deinit) {
            return rc;
        }

        const winner = this.winner();
        if (winner !== null) {
            console.debug('winnerString: have a winner, winner=', winner);
            rc = winner < 2 ? `Winner: ${PLAYERS[winner]}` : 'Tie!';
        }
        else {
            console.debug('winnerString: do not have a winner');
        }
        console.debug('winnerString: rc=', rc);

        return rc;
    }
}

export class AppModel {
    game: Accessor<GameModel>;
    _setGame: Setter<GameModel>;
    wins: Accessor<number[]>;
    _setWins: Setter<number[]>;

    constructor() {
        [this.game, this._setGame] = createSignal(new GameModel(this));
        [this.wins, this._setWins] = createSignal([0, 0, 0]); // maps to PLAYERS
    }

    move(cell: number) {
        console.debug(`app.move: cell=${cell}`);

        const game = this.game();
        game.move(cell);

        if (game.isComplete()) {
            this.updateWins();
        }
    }

    reset() {
        console.debug('app reset');
        this.game().deinit();
        this._setGame(new GameModel(this));
    }

    resetWins() {
        console.debug('app resetWins');
        this._setWins([0, 0, 0]);
    }

    updateWins() {
        console.debug('app updateWins');
        const _game = this.game();

        if (_game.isComplete()) {
            const winner = _game.winner();
            if (winner !== null) {
                const _wins = [...this.wins()];
                _wins[winner]++;
                console.debug('updateWins', winner, _wins);
                this._setWins(_wins);
            }
        }
    }
}
