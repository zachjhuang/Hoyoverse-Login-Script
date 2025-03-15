// import puppeteer from 'puppeteer-core';
const puppeteer = require('puppeteer-core');
const fs = require('fs');
// import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: './chrome-win/chrome.exe',
    defaultViewport: null,
    args: ['--start-maximized']
  });
  const page = await browser.newPage();
  await page.setRequestInterception(true);

  const urlPatterns = {
    'zzz/os/sign': 'zzz',
    'mani/sign': 'honkai',
    'sol/sign': 'genshin',
    // 'luna/os/sign': 'hsr'
    'hkrpg/os/sign': 'hsr'
  };

  const handlePostRequest = async (request) => {
    if (request.method() === 'POST'){
      let game;

      for (const pattern in urlPatterns) {
        if (request.url().includes(pattern)) {
          game = urlPatterns[pattern];
          break;
        }
      }
      
      if (!game) {
        request.continue();
        return;
      }

      console.log('POST request detected:', request.url());

      const postData = {
        url: request.url(),
        method: request.method(),
        headers: request.headers(),
        postData: request.postData(),
      };

      fs.writeFileSync(`request_data/request_data_${game}.json`, JSON.stringify(postData, null, 2));
      console.log(`${game} sign-in request data saved to JSON file`);
    }

    request.continue();
  }
  page.on('request', handlePostRequest);

  browser.on('targetcreated', async (target) => {
    const newPage = await target.page();
    if (newPage) {
      console.log('New tab opened');
      await newPage.setRequestInterception(true);

      newPage.on('request', handlePostRequest);
    }
  });

  await page.goto('https://hoyolab.com'); 
})();
