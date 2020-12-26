import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameViewModel, TicTacToeRequest, TicTacToeResponse } from './game.model';

@Injectable({
  providedIn: 'root'
})
export class TttapiService {

  constructor(private httpClient: HttpClient) { }

  move(player: number, location: number, game: GameViewModel): Observable<TicTacToeResponse> {
    const req = {
      oper_name: 'move',
      player,
      location,
      game
    } as TicTacToeRequest;

    return this.httpClient.put<TicTacToeResponse>(
      '/api/pytttapi',
      req
    );
  }

  reset(): Observable<TicTacToeResponse> {
    const req = {
      oper_name: 'reset',
    } as TicTacToeRequest;

    return this.httpClient.put<TicTacToeResponse>(
      '/api/pytttapi',
      req
    );
  }
}
