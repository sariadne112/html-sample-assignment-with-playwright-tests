// @ts-check
const { test, expect } = require("@playwright/test");
const mainPageUrl =
  "file:///home/navaari/PROJECTS/html-sample-assignment-with-playwright-tests/index.html";
const cleanArrFromEmptyItems = (arr) =>
  arr.filter((item) => item !== "");

test.beforeEach(async ({ page }) => {
  await page.goto(mainPageUrl);
});

test.describe("Live Server started", () => {
  test("The project development server is running with Live Server", async ({
    page,
  }) => {
    expect(page.url()).toBe(mainPageUrl);
  });
});

test.describe("The page title tests", () => {
  test("The document title should be `Sample project`", async ({
    page,
  }) => {
    await expect(page).toHaveTitle("Sample project");
  });
});

test.describe("The heading element tests", () => {
  test("The is just a single page heading HTML Element (<h1></h1>) set on the page", async ({
    page,
  }) => {
    const locator = page.locator("h1");
    await expect(locator).toHaveCount(1);
  });
});

test.describe("The paragraph element tests", () => {
  test("The page has a paragraph HTML Element (<p></p>) set on the page", async ({
    page,
  }) => {
    const locator = page.locator("p");
    await expect(locator).toBeAttached();
  });

  test("There is just a single paragraph HTML Element (<p></p>) set on the page", async ({
    page,
  }) => {
    const locator = page.locator("p");
    await expect(locator).toHaveCount(1);
  });

  test("The paragraph of text has at least 20 words", async ({
    page,
  }) => {
    const paragraphTextLength = page.locator("p").textContent();

    expect(
      await paragraphTextLength.then((content) => {
        return cleanArrFromEmptyItems(content?.trim().split(" "))
          .length;
      })
    ).toBeGreaterThanOrEqual(20);
  });
});
