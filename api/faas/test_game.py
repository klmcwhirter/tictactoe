"""game.py tests"""
import pytest

from .game import Game


@pytest.fixture
def tie_vector():
    """returns a Tie vector"""
    return [
        0, 0, 1,
        1, 1, 0,
        0, 0, 1
    ]


def test_Game_can_construct():
    """as stated"""
    g = Game()
    assert g is not None


def test_Game_hydrates_game_if_in_req():
    """Should be able to hydrate Game from dict passed"""
    req = {
        'winner': 2
    }
    game = Game(req)

    assert game.winner is not None


def test_is_complete_returns_false_if_not_done():
    """as stated"""
    game = Game()
    assert game.is_complete() is False


def test_is_complete_returns_true_if_winner():
    """as stated"""
    vector = [
        0, 0, 0,
        1, None, None,
        None, None, None
    ]
    game = Game()
    game.set_moves(vector)
    assert game.is_complete()
    assert 0 == game.winner


def test_is_complete_returns_true_if_tie(tie_vector):
    """as stated"""
    game = Game()
    game.set_moves(tie_vector)
    assert game.is_complete()
    assert 2 == game.winner


def test_move_appends_move_to_game():
    """as stated"""
    game = Game()
    assert 0 == len(game.moves)

    game.move(2, 3)
    assert 1 == len(game.moves)
    assert (2, 3) == game.moves[0]


def test_move_completes_game_if_done():
    """as stated"""
    game = Game()
    game.move(0, 0)
    game.move(0, 1)
    assert game.winner is None

    game.move(0, 2)
    assert 0 == game.winner


def test_set_moves_creates_moves_from_vector(tie_vector):
    """as stated"""
    game = Game()
    assert 0 == len(game.moves)

    game.set_moves(tie_vector)
    assert 9 == len(game.moves)

    for i in range(9):
        assert (tie_vector[i], i) == game.moves[i]
