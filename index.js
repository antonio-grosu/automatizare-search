const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setViewport({ width: 1080, height: 1024 });
  await page.goto(
    "https://www.google.com/search?q=scoli+private+bucuresti&rlz=1C5CHFA_enRO1107RO1107&oq=scol&gs_lcrp=EgZjaHJvbWUqDAgBECMYJxiABBiKBTIGCAAQRRg5MgwIARAjGCcYgAQYigUyBggCEEUYOzIMCAMQABhDGIAEGIoFMgwIBBAAGEMYgAQYigUyDAgFEAAYQxiABBiKBTIMCAYQABhDGIAEGIoFMgwIBxAAGEMYgAQYigUyBwgIEAAYgAQyBwgJEAAYjwLSAQgyNDIwajBqN6gCALACAA&sourceid=chrome&ie=UTF-8",
    { waitUntil: "networkidle2" }
  );

  try {
    await page.waitForSelector("button#L2AGLb", {
      visible: true,
      timeout: 5000,
    });
    await page.click("button#L2AGLb");
    await page.waitForNavigation({ waitUntil: "networkidle2" });
  } catch (error) {
    console.log('No "Accept all" button or prompt not present.');
  }

  // Wait for the element with class YmvwI to be visible and click it
  try {
    await page.waitForSelector("a.nPDzT", { visible: true, timeout: 5000 });
    const links = await page.$$eval("a.nPDzT", (elements) =>
      elements.map((e) => e.href)
    );

    if (links.length > 1) {
      // Click on the second <a> element
      await page.goto(links[1], { waitUntil: "networkidle2" });
    } else {
      console.log('Not enough <a> elements with class "nPDzT" found.');
      await browser.close();
      return;
    }
  } catch (error) {
    console.log(
      'Error while finding or clicking on <a> elements with class "nPDzT".'
    );
  }

  await page.waitForNavigation({ waitUntil: "networkidle2" });
  await page.screenshot({ path: "screenshot.png" });
  // here
  await browser.close();
})();
