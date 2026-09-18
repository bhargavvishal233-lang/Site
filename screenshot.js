const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('https://makro.framer.website/', { waitUntil: 'networkidle2' });
  
  // Wait for the Pricing section
  await page.waitForSelector('h2'); 
  
  // Find the button with text "Try free for 14 days" that is in the Pro card
  // Let's just hover the middle card button.
  // Take a screenshot before hover
  await page.screenshot({path: 'before_hover.png'});
  
  const buttons = await page.$$('a[href="#"]'); // Or maybe it's just a div
  // Actually I can just hover the center of the screen or something, or evaluate some js.
  
  await browser.close();
})();
