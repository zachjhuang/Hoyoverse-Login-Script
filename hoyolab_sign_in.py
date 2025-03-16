import requests, json, random, os
from time import sleep

for game in ['genshin', 'honkai', 'hsr', 'zzz']:
    filename = f'request_data/request_data_{game}.json'
    if os.path.exists(filename):
      with open(filename, 'r') as file:
        request_data = json.load(file)
      url = request_data['url']
      headers = request_data['headers']
      post_data = request_data['postData']
      response_decoded_json = requests.post(url, data=post_data, headers=headers)
      response_json = response_decoded_json.json()
      print(f"\n{game}: " + response_json['message'])
      sleep(random.uniform(5, 10))
input("\nPress Enter to exit...")