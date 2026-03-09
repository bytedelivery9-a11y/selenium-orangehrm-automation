const { createDriver } = require("../utils/driver");
const LoginPage = require("../pages/loginPage");
const PIMPage = require("../pages/pimPage");

describe("Search Employee Automation", function () {

    let driver;
    let loginPage;
    let pimPage;

    this.timeout(90000);

    beforeEach(async function () {

        driver = await createDriver();

        loginPage = new LoginPage(driver);
        pimPage = new PIMPage(driver);

        await loginPage.openWebsite();

        await loginPage.enterUsername("Admin");
        await loginPage.enterPassword("admin123");

        await loginPage.clickLogin();

        await loginPage.isDashboardVisible();

    });

    it("Search employee by name", async function () {

        await pimPage.openPIM();

        await pimPage.searchEmployee("John");

        const results = await pimPage.verifySearchResults();

        if (!results) {
            throw new Error("Employee search failed");
        }

    });

    afterEach(async function () {

        if (driver) {
            await driver.quit();
        }

    });

});