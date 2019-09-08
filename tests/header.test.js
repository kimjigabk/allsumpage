const puppeteer = require("puppeteer");
function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"]
  });
  page = await browser.newPage();

  await page.goto("http://localhost:3000");
});

afterEach(async () => {
  await browser.close();
});

test("header has correct text", async () => {
  const text = await page.$eval("a.item", el => el.innerHTML);
  expect(text).toEqual("Allsum");
});

test("clicking oauth redirects to google oauth page", async () => {
  await page.waitFor("span.item.link");
  await page.click("span.item.link");
  await sleep(500);
  pages = await browser.pages();
  const popup = pages[pages.length - 1];
  url = popup.url();
  expect(url).toMatch(/accounts\.google\.com/);
});
