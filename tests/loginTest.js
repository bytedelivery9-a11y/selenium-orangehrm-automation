const { createDriver } = require("../utils/driver");
const LoginPage = require("../pages/loginPage");

describe("OrangeHRM Login Automation", function () {

    let driver;
    let loginPage;

    this.timeout(60000);

    beforeEach(async function () {

        driver = await createDriver();
        loginPage = new LoginPage(driver);

        await loginPage.openWebsite();
    });

    it("Login with valid credentials", async function () {

        await loginPage.enterUsername("Admin");
        await loginPage.enterPassword("admin123");

        await loginPage.clickLogin();

        const dashboardVisible = await loginPage.isDashboardVisible();

        if (!dashboardVisible) {
            throw new Error("Dashboard not visible - login failed");
        }

    });

    it("Login with invalid password", async function () {

        await loginPage.enterUsername("Admin");
        await loginPage.enterPassword("wrongpassword");

        await loginPage.clickLogin();

    });

    afterEach(async function () {

        if (driver) {
            await driver.quit();
        }

    });

});