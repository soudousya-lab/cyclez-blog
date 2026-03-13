import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
const filePath = 'file://' + path.resolve(__dirname, 'cyclez_strategy_report.html');
await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 30000 });
await page.pdf({
  path: path.resolve(__dirname, 'cyclez_strategy_report.pdf'),
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: true
});
await browser.close();
console.log('PDF generated: cyclez_strategy_report.pdf');
