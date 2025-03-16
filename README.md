# Hoyoverse Login Script

All-in-one tool to complete Hoyolab daily login rewards for Genshin Impact, Honkai Star Rail, Zenless Zone Zero, and Honkai Impact 3rd.

By intercepting and storing the requests made when a login is performed manually, the requests can be resent through the script to fulfill the login without opening Hoyolab.

The script runs entirely locally. Information such as login details or cookies are not stored anywhere else besides the **request_data/** folder.

## How it works:

### 1. Obtain request data.
**capture_sign_in_requests.exe** starts a Chromium development browser and opens **hoyolab.com**. 

NOTE: a Chromium binary folder **chrome-win/** must be present in the working folder. A tested and working Chromium binary .zip is available in Releases. 
An up-to-date binary can manually downloaded at https://download-chromium.appspot.com/ but may or may not work with the script.

From there, the user must log in to their Hoyoverse account and manually complete the log in reward check for any number of the aforementioned games. 

**capture_sign_in_requests.exe** uses the **puppeteer** library to automatically capture POST requests corresponding to the log in check and store them in JSON format in **request_data/**.

Alternatively, **node** users can run **npm run install** followed by **node capture_sign_in_requests.js**.

Request data can also be retrieved manually using F12 developer tools and scanning the **Network** tab for POST requests made when the login check is performed. 

The request data, including cookies, must be properly formatted in JSON format, e.g.

**request_data_genshin.json**, 
**request_data_hsr.json**, 
**request_data_zzz.json**, 
**request_data_honkai.json**
```
{
  "url": "https://sg-hk4e-api.hoyolab.com/event/sol/sign?lang=en-us",
  "method": "POST",
  "headers": {
    "sec-ch-ua-platform": "\"Windows\"",
    "x-rpc-platform": "4",
    "x-rpc-device_name": "",
    "x-rpc-device_id": "placeholder_id",
    "accept-language": "en-US,en;q=0.9",
    "sec-ch-ua": "\"Not:A-Brand\";v=\"24\", \"Chromium\";v=\"134\"",
    "referer": "https://act.hoyolab.com/",
    "x-rpc-app_version": "",
    "sec-ch-ua-mobile": "?0",
    "user-agent": "placeholder_user_agent",
    "accept": "application/json, text/plain, */*",
    "content-type": "application/json;charset=UTF-8",
    "cookie": "placeholder_cookie"
  },
  "postData": "{\"act_id\":\"placeholder_id\"}"
}
```
### 2. Send the request data.

**hoyolab_sign_in.exe** opens a command prompt window and sends a login request for all existing **request_data_{game}.json** files.

Alternatively, **python** users can run **pip install requests** followed by **py hoyolab_sign_in.py**.

### 3. Daily automation (optional).

**Windows Task Scheduler** can automatically run .exe programs in daily intervals. In the Windows Menu, search Task Scheduler and select Create Basic Task. The trigger should be daily recurring, and the action is starting a program (**hoyolab_sign_in.exe**).

# TODO
- Linux/Mac support (unlikely)
- Automated server with request data stored in database
