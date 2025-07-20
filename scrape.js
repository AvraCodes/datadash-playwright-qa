// scrape.js
const { chromium } = require('playwright');

const seeds = Array.from({ length: 10 }, (_, i) => 71 + i);
const baseUrl = 'https://your-report-site.com/seed'; // Replace with actual base URL

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let total = 0;

  for (const seed of seeds) {
    const url = `${baseUrl}${seed}`;
    console.log(`Visiting ${url}`);
    await page.goto(url);

    const tables = await page.$$('table');
    for (const table of tables) {
      const text = await table.innerText();
      const numbers = text.match(/[-+]?[0-9]*\.?[0-9]+/g);
      if (numbers) {
        total += numbers.map(Number).reduce((a, b) => a + b, 0);
      }
    }
  }

  console.log('TOTAL SUM:', total);
  await browser.close();
})();
