"""handler for openfaas events"""
from .tictactoe import get_command
from .handler_models import Event

def handle(event: Event, context):
    cmd = get_command(event.body)
    rc = cmd.run()
    return rc
