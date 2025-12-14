const { chromium } = require('playwright');
const url = process.argv[2] || 'https://as6173268.github.io/Porteria/';
(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();

  page.on('console', (msg) => {
    console.log(`CONSOLE [${msg.type()}] ${msg.text()}`);
  });

  page.on('pageerror', (err) => {
    console.log('PAGEERROR', err.message);
  });

  page.on('requestfailed', (req) => {
    const f = req.failure();
    console.log('REQFAILED', req.method(), req.url(), f && f.errorText ? f.errorText : f);
  });

  page.on('response', (resp) => {
    const status = resp.status();
    if (status >= 400) console.log('RESPERR', status, resp.url());
  });

  try {
    console.log('NAVIGATING', url);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    const html = await page.content();
    console.log('PAGE_HTML_START');
    console.log(html.slice(0, 2000));
    console.log('PAGE_HTML_END');
  } catch (e) {
    console.error('ERROR', e && e.message ? e.message : e);
    process.exitCode = 2;
  } finally {
    await browser.close();
  }
})();
