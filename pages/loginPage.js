const { By, until } = require("selenium-webdriver");

class LoginPage {

    constructor(driver) {
        this.driver = driver;

        // Locators
        this.username = By.name("username");
        this.password = By.name("password");
        this.loginBtn = By.css("button[type='submit']");
        this.dashboard = By.xpath("//h6[text()='Dashboard']");
    }

    // Open OrangeHRM website
    async openWebsite() {
        await this.driver.get("https://opensource-demo.orangehrmlive.com/");
    }

    // Enter username
    async enterUsername(username) {
        const usernameField = await this.driver.wait(
            until.elementLocated(this.username),
            10000
        );
        await usernameField.sendKeys(username);
    }

    // Enter password
    async enterPassword(password) {
        const passwordField = await this.driver.wait(
            until.elementLocated(this.password),
            10000
        );
        await passwordField.sendKeys(password);
    }

    // Click login button
    async clickLogin() {
        const loginButton = await this.driver.wait(
            until.elementLocated(this.loginBtn),
            10000
        );
        await loginButton.click();
    }

    // Verify dashboard after successful login
   async isDashboardVisible() {

    const dashboard = await this.driver.wait(
        until.elementLocated(this.dashboard),
        30000
    );

    await this.driver.wait(
        until.elementIsVisible(dashboard),
        30000
    );

    return dashboard.isDisplayed();
}
}

module.exports = LoginPage;