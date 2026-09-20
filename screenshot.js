const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://kirk-sinner.framer.website/', { waitUntil: 'networkidle0' });
  
  // Wait a bit for framer animations to settle
  await new Promise(r => setTimeout(r, 2000));
  
  // Take a full page screenshot
  await page.screenshot({path: 'kirk_sinner_full.png', fullPage: true});
  
  await browser.close();
})();
