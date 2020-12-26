export interface GameViewModel {
    winner?: number;
    moves: number[][]
}

export interface TicTacToeRequest {
    oper_name: string;
    player: number;
    location: number;
    game: GameViewModel;
}

export interface TicTacToeResponse {
    status: string;
    game: GameViewModel;
}
