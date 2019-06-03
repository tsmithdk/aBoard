import { AppPage } from "./app.po";
import { browser, logging, by, element, $$ } from "protractor";

describe("workspace-project App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should display welcome message", () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual("aBoard Messages");
  });

  it("should test the register", () => {
    // write test no. 2.
    browser.get("users/register");

    page.getByFormControlName("username").sendKeys("User");
    // browser.sleep(1000);
    page.getByFormControlName("email").sendKeys("e@e.dk");
    // browser.sleep(1000);
    page.getByFormControlName("password").sendKeys("whateverPassword"); // nice alternative where no id is needed.
    // browser.sleep(1000);
    element(by.id("btnUserRegister")).click();
    // browser.sleep(1000);
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + "/users/login");
    // browser.sleep(1000);
  });

  it("should test the login", () => {
    // write test #3.
    browser.get("/users/login");

    page.getByFormControlName("username").clear();
    page.getByFormControlName("username").sendKeys("User");
    // browser.sleep(1000);
    page.getByFormControlName("password").clear();
    page.getByFormControlName("password").sendKeys("whateverPassword");
    // browser.sleep(1000);
    element(by.id("btnUserLogin")).click();
    // browser.sleep(1000);
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + "/home");
    // browser.sleep(1000);
  });

  it("should create a new message", () => {
    browser.get("users/login");
    page.getByFormControlName("username").clear();
    page.getByFormControlName("username").sendKeys("User");
    // browser.sleep(1000);
    page.getByFormControlName("password").clear();
    page.getByFormControlName("password").sendKeys("whateverPassword");
    // browser.sleep(1000);
    element(by.id("btnUserLogin")).click();

    // Verify that we now have 1 more product.
    $$(".single-card").then(elementsBeforeAdding => {
      let noOfElemsBefore = elementsBeforeAdding.length;
      //element(by.id("btnMessage")).click();

      page.getByFormControlName("title").sendKeys("TitleTest");
      page.getByFormControlName("content").sendKeys("blablablacontent");
      element(by.id("btnMessage")).click();

      $$(".single-card").then(elementsAfterAdding => {
        expect(elementsAfterAdding.length - noOfElemsBefore).toEqual(1);
      });
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser
      .manage()
      .logs()
      .get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE
      } as logging.Entry)
    );
  });
});
