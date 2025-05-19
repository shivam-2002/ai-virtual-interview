import configparser

config = configparser.ConfigParser()
config.read('config.ini')

gemini_cred = {
    'api_key': config['gemini']['api_key']
}

frontend = {
    'base_url': config['frontend']['base_url']
}

db = {
    'host': config['db']['host'],
    'user': config['db']['user'],
    'db': config['db']['db'],
    'password': config['db']['password']
}
