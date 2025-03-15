import requests, json, random, os
from time import sleep

for game in ['genshin', 'honkai', 'hsr', 'zzz']:
    if os.path.exists(f'requestata/requestData_{game}.json'):
      with open(f'requestData/requestData_{game}.json', 'r') as file:
        request_data = json.load(file)
      url = request_data['url']
      headers = request_data['headers']
      payload = request_data['postData']
      response_decoded_json = requests.post(url, data=payload, headers=headers)
      response_json = response_decoded_json.json()
      print(f"\n{game}: " + response_json['message'])
      sleep(random.uniform(5, 10))