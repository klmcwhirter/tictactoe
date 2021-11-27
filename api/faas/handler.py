"""handler for openfaas events"""
from .handler_models import Event
from .tictactoe import get_command

def handle(event: Event, context):
    cmd = get_command(event.body)
    rc = cmd.run()
    return rc
