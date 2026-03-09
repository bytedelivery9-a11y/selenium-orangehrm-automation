const { createDriver } = require("../utils/driver");
const LoginPage = require("../pages/loginPage");
const PIMPage = require("../pages/pimPage");

describe("Add Employee Automation", function () {

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

        // Wait until dashboard loads
        const dashboardLoaded = await loginPage.isDashboardVisible();

        if (!dashboardLoaded) {
            throw new Error("Dashboard did not load after login");
        }

    });

    it("Add new employee", async function () {

        await pimPage.openPIM();

        await pimPage.clickAddEmployee();

        await pimPage.enterFirstName("John");

        await pimPage.enterLastName("Tester");

        await pimPage.clickSave();

        const employeeCreated = await pimPage.verifyEmployeeCreated();

        if (!employeeCreated) {
            throw new Error("Employee creation failed");
        }

    });

    afterEach(async function () {

        if (driver) {
            await driver.quit();
        }

    });

});