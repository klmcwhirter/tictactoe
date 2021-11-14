"""Tic Tac Toe game commands"""
import json
from .game import Game, GameJSONEncoder


class TicTacToeCommand(object):
    """A command that implements an operation of a game of Tic Tac Toe"""

    def __init__(self, req):
        """Iniitialize the command"""
        if 'oper_name' in req:
            self.oper_name = req['oper_name']
        else:
            self.oper_name = None
        self.game = None
        self.player = 0

    def __str__(self):
        """Provide string repesentation"""
        return f"{self.__class__.__name__} {{ 'oper_name': {self.oper_name} }}"

    def oper(self):
        """Implement the command."""
        return {'status': 404}

    def run(self) -> str:
        """Run the command.

        Returns:
            str: JSON response object
        """
        resp = self.oper()

        return json.dumps(resp, cls=GameJSONEncoder)


class TicTacToeMoveCommand(TicTacToeCommand):
    """Command to make a move in the game"""

    def __init__(self, req):
        """Iniitialize the command"""
        super().__init__(req)
        if not hasattr(self, 'oper_name') or self.oper_name is None:
            self.oper_name = 'move'
        self.game = Game(req['game']) if 'game' in req else Game()
        self.player = req['player']
        self.location = req['location']

    def oper(self, *args):
        """Implement the command."""
        self.game.move(self.player, self.location)
        return {
            'status': 200,
            'game': self.game
        }


class TicTacToeResetCommand(TicTacToeCommand):
    """Command to reset the game"""

    def __init__(self, req):
        """Iniitialize the command"""
        super().__init__(req)
        if not hasattr(self, 'oper_name') or self.oper_name is None:
            self.oper_name = 'reset'
        self.game = Game()

    def oper(self, *args):
        """Implement the command."""
        return {
            'status': 200,
            'game': self.game
        }


commands = dict({
    "move": TicTacToeMoveCommand,
    "reset": TicTacToeResetCommand
})


def get_command(jsonreq):
    """Get a command object using the factory pattern
            Args:
            jsonreq (str): JSON request body
    """
    if jsonreq:
        req = json.loads(jsonreq)
    else:
        req = {}

    cls = TicTacToeCommand
    if req and "oper_name" in req and req["oper_name"] in commands:
        cls = commands[req["oper_name"]]
    return cls(req)


if __name__ == "__main__":
    def exec_command(jsonreq):
        _cmd = get_command(jsonreq)
        print(f'_cmd={_cmd}')
        _resp = _cmd.run()
        print(f'_resp={_resp}')

    exec_command(
        '{ "oper_name": "move", "player": 0, "location": 4 }'
    )
    exec_command(
        '{ "oper_name": "move", "player": 1, "location": 1, "game": {"winner": null, "moves": [[0, 4]]} }'
    )
    exec_command(
        '{ "oper_name": "move", "player": 0, "location": 0, "game": {"winner": null, "moves": [[0, 4], [1, 1]]} }'
    )
    exec_command(
        '{ "oper_name": "move", "player": 1, "location": 3, \
            "game": {"winner": null, "moves": [[0, 4], [1, 1], [0, 0]]} }'
    )
    exec_command(
        '{ "oper_name": "move", "player": 0, "location": 8, \
            "game": {"winner": null, "moves": [[0, 4], [1, 1], [0, 0], [1, 3]]} }'
    )

    exec_command(
        '{ "oper_name": "reset" }'
    )