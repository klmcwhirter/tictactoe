"""handler for openfaas events"""
from .tictactoe import get_command


def handle(req):
    """handle a request to the function
    Args:
        req (str): request JSON body
    """

    cmd = get_command(req)
    rc = cmd.run()
    return rc
