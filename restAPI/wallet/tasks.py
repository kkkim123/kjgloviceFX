from restAPI import celery
import json
import requests
import ast

from celery import shared_task
from .models import Wallet, TransactionHistory

# @app.task
# def send_verification_email(user_id):
#     UserModel = get_user_model()
#     try:
#         user = UserModel.objects.get(pk=user_id)
#         send_mail(
#             'Verify your QuickPublisher account',
#             'Follow this link to verify your account: '
#                 'http://localhost:8000%s' % reverse('verify', kwargs={'uuid': str(user.verification_uuid)}),
#             'from@quickpublisher.dev',
#             [user.email],
#             fail_silently=False,
#         )
#     except UserModel.DoesNotExist:
#         logging.warning("Tried to send verification email to non-existing user '%s'" % user_id)


@shared_task
def get_transaction_list():
    KJ_TRANSACTION_URL = 'http://3.0.181.55:3000/kj/listTransaction'
    # Get All user Address
    wallet_queryset = Wallet.objects.all()

    # Call API(by address count)
    for wallet in wallet_queryset:
        try:
            headers = {'Content-Type': 'application/x-www-form-urlencoded'}
            data = {'addresses': wallet.address, 'range': 200}
            res = requests.post(KJ_TRANSACTION_URL, headers=headers, data=data)

            if res.status_code == 200:
                try:
                    result_content = json.loads(res.content.decode('utf-8'))
                    
                    for result in result_content['result']:
                        for tx in result['tx']:
                            result_hash = tx['hash']
                            # 중복되는 hash transaction이 있으면 skip, 아니면 insert
                            try:
                                transaction_obj = TransactionHistory.objects.get(hash=result_hash)
                                continue
                            except TransactionHistory.DoesNotExist:
                                # insert transaction
                                transaction = TransactionHistory.objects.create(
                                    hash = result_hash,
                                    confirmations = tx['confirmations'],
                                    from_address = tx['from'],
                                    to_address = tx['to'],
                                    value = tx['value']
                                )
                                transaction.save()
                                # update balance
                                KJ_BALANCE_URL = 'http://3.0.181.55:3000/kj/fx/getbalance/' + str(tx['to'])
                                jsresponse = requests.get(KJ_BALANCE_URL).json()
                                queryset.update(kj_balance=jsresponse['balnace'])
                                ETH_BALANCE_URL = 'http://3.0.181.55:3000/eth/fx/getbalance/' + str(tx['to'])
                                jsresponse = requests.get(ETH_BALANCE_URL).json()
                                queryset.update(eth_balance=jsresponse['balnace'])
                except Exception:
                    pass
            else:
                pass
        except Exception:
            pass

