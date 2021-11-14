"""Test the tictactoe module"""
import json

from .tictactoe import (
    TicTacToeCommand,
    TicTacToeMoveCommand,
    get_command
)


def test_TicTacToeCommand_can_construct():
    """Can construct object with no required properties"""
    obj = TicTacToeCommand({})
    assert obj is not None
    assert issubclass(obj.__class__, TicTacToeCommand)


def test_TicTacToeCommand_oper_name_None_if_not_passed():
    """as stated"""
    obj = TicTacToeCommand({})
    assert obj.oper_name is None


def test_TicTacToeCommand_sets_oper_name_if_passed():
    """as stated"""
    obj = TicTacToeCommand({'oper_name': 'foo'})
    assert 'foo' == obj.oper_name


def test_TicTacToeCommand_sets_property_defaults():
    """as stated"""
    obj = TicTacToeCommand({})
    assert obj.game is None
    assert 0 == obj.player


def test_TicTacToeCommand_provides_str():
    """as stated"""
    obj = TicTacToeCommand({})
    assert "TicTacToeCommand { 'oper_name': None }" == str(obj)


def test_TicTacToeCommand_default_oper_returns_404():
    """as stated"""
    obj = TicTacToeCommand({})
    assert 404 == obj.oper()['status']


def test_TicTacToeCommand_run_returns_oper_result_as_json():
    """as stated"""
    obj = TicTacToeCommand({})
    jsonstr = obj.run()
    assert '{"status": 404}' == jsonstr


def test_TicTacToeMoveCommand_can_construct():
    """Can construct object with these required properties"""
    obj = TicTacToeMoveCommand({'uid': 0, 'player': 0, 'location': 0})
    assert obj is not None
    assert issubclass(obj.__class__, TicTacToeCommand)


def test_TicTacToeMoveCommand_oper_name_is_move():
    """as stated"""
    obj = TicTacToeMoveCommand({'uid': 0, 'player': 0, 'location': 0})
    assert 'move' == obj.oper_name


def test_TicTacToeMoveCommand_run_returns_oper_result_as_json():
    """as stated"""
    obj = TicTacToeMoveCommand({'uid': 0, 'player': 0, 'location': 0})
    jsonstr = obj.run()

    assert jsonstr.startswith('{"status": 200, "game": ')

    jobj = json.loads(jsonstr)
    # needed because of how the JSON encoder works
    jobj['game']['moves'] = [(m[0], m[1]) for m in jobj['game']['moves']]
    assert jobj['game'] == obj.game.__dict__


def test_get_command_gets_TicTacToeCommand_if_unknown_oper():
    """as stated"""
    cmd = get_command('{ "oper_name": "bogus", "uid": 0, "player": 0, "location": 0 }')

    assert isinstance(cmd, TicTacToeCommand)
    assert not isinstance(cmd, (TicTacToeMoveCommand))


def test_get_command_gets_TicTacToeMoveCommand_if_oper_is_move():
    """as stated"""
    cmd = get_command('{ "oper_name": "move", "uid": 0, "player": 0, "location": 0 }')

    assert issubclass(cmd.__class__, TicTacToeMoveCommand)
