from web3 import Web3, HTTPProvider

import configparser

config = configparser.ConfigParser()
config.read('common/config/config.ini')


class TokenUtil:
    ABI = [
        {'constant': True, 'inputs': [], 'name': 'name', 'outputs': [{'name': '', 'type': 'string'}], 'payable': True,
         'stateMutability': 'view', 'type': 'function'},
        {'constant': False, 'inputs': [{'name': '_spender', 'type': 'address'}, {'name': '_value', 'type': 'uint256'}],
         'name': 'approve', 'outputs': [{'name': '', 'type': 'bool'}], 'payable': True, 'stateMutability': 'nonpayable',
         'type': 'function'},
        {'constant': True, 'inputs': [], 'name': 'totalSupply', 'outputs': [{'name': '', 'type': 'uint256'}],
         'payable': True, 'stateMutability': 'view', 'type': 'function'}, {'constant': False, 'inputs': [
            {'name': '_from', 'type': 'address'}, {'name': '_to', 'type': 'address'},
            {'name': '_value', 'type': 'uint256'}], 'name': 'transferFrom', 'outputs': [{'name': '', 'type': 'bool'}],
                                                                           'payable': True,
                                                                           'stateMutability': 'nonpayable',
                                                                           'type': 'function'},
        {'constant': True, 'inputs': [], 'name': 'decimals', 'outputs': [{'name': '', 'type': 'uint8'}],
         'payable': True, 'stateMutability': 'view', 'type': 'function'},
        {'constant': True, 'inputs': [{'name': '_owner', 'type': 'address'}], 'name': 'balanceOf',
         'outputs': [{'name': '', 'type': 'uint256'}], 'payable': True, 'stateMutability': 'view', 'type': 'function'},
        {'constant': True, 'inputs': [], 'name': 'symbol', 'outputs': [{'name': '', 'type': 'string'}], 'payable': True,
         'stateMutability': 'view', 'type': 'function'},
        {'constant': False, 'inputs': [{'name': '_to', 'type': 'address'}, {'name': '_value', 'type': 'uint256'}],
         'name': 'transfer', 'outputs': [{'name': '', 'type': 'bool'}], 'payable': True,
         'stateMutability': 'nonpayable', 'type': 'function'},
        {'constant': True, 'inputs': [{'name': '_owner', 'type': 'address'}, {'name': '_spender', 'type': 'address'}],
         'name': 'allowance', 'outputs': [{'name': '', 'type': 'uint256'}], 'payable': True, 'stateMutability': 'view',
         'type': 'function'}, {'anonymous': False, 'inputs': [{'indexed': True, 'name': '_from', 'type': 'address'},
                                                              {'indexed': True, 'name': '_to', 'type': 'address'},
                                                              {'indexed': False, 'name': '_value', 'type': 'uint256'}],
                               'name': 'Transfer', 'type': 'event'}, {'anonymous': False, 'inputs': [
            {'indexed': True, 'name': '_owner', 'type': 'address'},
            {'indexed': True, 'name': '_spender', 'type': 'address'},
            {'indexed': False, 'name': '_value', 'type': 'uint256'}], 'name': 'Approval', 'type': 'event'}]

    # web3 infura network 연결
    web3 = Web3(HTTPProvider(config["INFURA"]["URI"]))

    # 사용자 토큰 조회 - User Token Lookup
    def select_token_value(user, type):
        address = ""
        pay_token = 0
        won_token = 0
        eth_type = config['TOKEN']['ETH_TYPE']
        jkl_type = config['TOKEN']['JKL_TYPE']

        if type == eth_type:
            address = user.eth_wallet
            pay_token = user.eth_pay
            won_token = user.eth_won
        elif type == jkl_type:
            address = user.jkl_wallet
            pay_token = user.jkl_pay
            won_token = user.jkl_won

        # 지갑이 존재할 경우 잔액 조회 - View balance if wallet exists
        # 가상 계좌에 있는 토큰 잔액 + 상금 - 구매 잔액 - Token Balance + Prize-Purchase Balance in Virtual Account
        if not address is None:
            web3 = TokenUtil.web3

            # 이더리움 토큰일 경우와 타 토큰일 경우 전송 방식이 다른것으로 판단 - In case of Ethereum token and other tokens, the transmission method is different
            # 타 토큰일 경우 Contract Address를 입력하여 balance를 반환받는다 - In case of other tokens, the contract is returned by entering the Contract Address.
            if type == eth_type:
                select_token = web3.eth.getBalance(address)
            elif type == jkl_type:
                checksum_address = TokenUtil.web3.toChecksumAddress(config['TOKEN']['JKL_CA'])

                contract = TokenUtil.web3.eth.contract(checksum_address, abi=TokenUtil.ABI)
                select_token = contract.functions.balanceOf(address).call()

            select_token = float(web3.fromWei(select_token, "ether"))

            return round(select_token + won_token - pay_token, 2)

        return 0

    # 사용자 토큰 계정 발급 - Issue User Token Account
    def update_wallet_user(user, type):
        web3 = TokenUtil.web3
        account = web3.eth.account.create("ntucorp")

        privateKey = \
            TokenUtil.binary_to_hex(account.privateKey)

        if type == config['TOKEN']['ETH_TYPE']:
            user.eth_wallet = account.address
            user.eth_privateKey = privateKey
        elif type == config['TOKEN']['JKL_TYPE']:
            user.jkl_wallet = account.address
            user.jkl_privateKey = privateKey

        user.save()

    # 토큰 전송 - Send token
    def transfer_token(account, to_address, value):
        web3 = TokenUtil.web3
        from_address = account["address"]
        private_key = account["privateKey"]
        # checksum_address = web3.toChecksumAddress(account["contractAddress"])
        checksum_address = web3.toChecksumAddress(account["contractAddress"])
        unicorns = TokenUtil.web3.eth.contract(to_address, abi=TokenUtil.ABI)

        unicorn_txn = unicorns.functions.transfer(
            checksum_address,
            web3.toWei(value, 'ether'),
        ).buildTransaction(dict(
            nonce=web3.eth.getTransactionCount(from_address),
            gas=100000,
            gasPrice=web3.eth.gasPrice,
            chainId=int(config["TOKEN"]["NETWORK_ID"]),
            value=web3.toWei(value, 'ether'),
        ))

        signed_txn = web3.eth.account.signTransaction(unicorn_txn, private_key)

        # 트랜잭션 전송 후 Transaction ID 반환 - Return Transaction ID after transaction is sent
        txid = TokenUtil.binary_to_hex(web3.eth.sendRawTransaction(signed_txn.rawTransaction))

        return txid

    def binary_to_hex(binary):
        return binary.hex()
