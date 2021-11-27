"""Definitions of the game"""
import json


def get_game(req):
    """Get the game given the passed in uid"""
    return Game(req)


WAYS_TO_WIN = ((0, 1, 2),
               (3, 4, 5),
               (6, 7, 8),
               (0, 3, 6),
               (1, 4, 7),
               (2, 5, 8),
               (0, 4, 8),
               (2, 4, 6))


class Game(object):
    """A game of Tic Tac Toe"""

    def __init__(self, jobj=None):
        """jobj provides the parameter needed to implement a copy ctor"""
        self.winner = jobj['winner'] if jobj and 'winner' in jobj else None
        self.moves = jobj['moves'] if jobj and 'moves' in jobj else []

    def is_complete(self):
        '''Determines if there is a winner or board is full.'''

        vector = self.moves_as_vector()
        for w2w in WAYS_TO_WIN:
            if vector[w2w[0]] == vector[w2w[1]] == vector[w2w[2]] is not None:
                self.winner = vector[w2w[0]]
                return True

        if len(self.moves) >= 9:    # Tie
            self.winner = 2
            return True

        return False

    def move(self, player, location):
        if(not self.is_complete()):
            self.moves.append((player, location))
        # set winner if there is one
        self.is_complete()

    def moves_as_vector(self):
        '''Returns a vector that has the players placed in it for each move.'''
        vector = [None for v in range(9)]
        for player, location in self.moves:
            vector[location] = player
        return vector

    def set_moves(self, vector):
        """set moves from a players vector"""
        self.moves = [(vector[i], i) for i in range(9)]
