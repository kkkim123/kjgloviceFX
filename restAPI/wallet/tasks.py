from background_task import background
from .models import Wallet

@background(schedule=6)
def notify_user(id):
    print("6")
