import { Component } from '@angular/core';
import { GameViewModel } from './game.model';
import { TttapiService } from './tttapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tictactoe';
  cells: string[];
  players = ['X', 'O', 'Tie'];

  currentPlayer = 0;
  game: GameViewModel;

  constructor(private tttapiService: TttapiService) {
    this.game = { moves: [] } as GameViewModel;
    this.cells = Array.from(Array(9)).map((c, i) => '');
    this.reset();
  }

  getPlayer(i: number): string {
    let player = '';
    const move = this.game.moves.find(v => v && v[1] === i);
    if (move) {
      player = this.players[move[0]];
    }
    return player;
  }

  move(i: number): void {
    this.tttapiService.move(this.currentPlayer, i, this.game)
      .subscribe(r => {
        if (r.status !== '200') {
          console.log('move returned', r.status);
        }
        // console.log(r);
        this.game = r.game;
        this.cells = Array.from(Array(9)).map((c, i) => this.getPlayer(i));
        this.currentPlayer = 1 - this.currentPlayer;
      });
  }

  reset(): void {
    this.tttapiService.reset()
      .subscribe(r => {
        if (r.status !== '200') {
          console.log('reset returned', r.status);
        }
        // console.log(r);
        this.game = r.game;
        this.cells = Array.from(Array(9)).map((c, i) => '');
        this.currentPlayer = 0;
      });
  }
}
