const { By, until } = require("selenium-webdriver");

class PIMPage {

    constructor(driver) {
        this.driver = driver;

        // PIM Menu
        this.pimMenu = By.xpath("//span[text()='PIM']");

        // Add Employee
        this.addEmployeeButton = By.xpath("//button[normalize-space()='Add']");
        this.firstName = By.name("firstName");
        this.lastName = By.name("lastName");
        this.saveButton = By.xpath("//button[@type='submit']");
        this.employeeHeader = By.xpath("//h6[text()='Personal Details']");

        // Search Employee
        this.employeeNameSearch = By.xpath("//input[@placeholder='Type for hints...']");
        this.searchButton = By.xpath("//button[normalize-space()='Search']");
        this.resultTable = By.xpath("//div[@class='oxd-table-body']");
    }

    // Open PIM module
    async openPIM() {

        const pim = await this.driver.wait(
            until.elementLocated(this.pimMenu),
            20000
        );

        await this.driver.wait(
            until.elementIsVisible(pim),
            20000
        );

        await pim.click();
    }

    // Click Add Employee
    async clickAddEmployee() {

        const addButton = await this.driver.wait(
            until.elementLocated(this.addEmployeeButton),
            20000
        );

        await this.driver.wait(
            until.elementIsVisible(addButton),
            20000
        );

        await addButton.click();
    }

    // Enter First Name
    async enterFirstName(firstname) {

        const field = await this.driver.wait(
            until.elementLocated(this.firstName),
            20000
        );

        await this.driver.wait(
            until.elementIsVisible(field),
            20000
        );

        await field.sendKeys(firstname);
    }

    // Enter Last Name
    async enterLastName(lastname) {

        const field = await this.driver.wait(
            until.elementLocated(this.lastName),
            20000
        );

        await this.driver.wait(
            until.elementIsVisible(field),
            20000
        );

        await field.sendKeys(lastname);
    }

    // Click Save (with loader protection)
    async clickSave() {

        const saveButton = await this.driver.wait(
            until.elementLocated(this.saveButton),
            20000
        );

        await this.driver.wait(
            until.elementIsVisible(saveButton),
            20000
        );

        await this.driver.wait(
            until.elementIsEnabled(saveButton),
            20000
        );

        // Wait until OrangeHRM loader disappears
        await this.driver.wait(async () => {
            const loaders = await this.driver.findElements(
                By.css(".oxd-form-loader")
            );
            return loaders.length === 0;
        }, 20000);

        await saveButton.click();
    }

    // Verify employee creation
    async verifyEmployeeCreated() {

        const header = await this.driver.wait(
            until.elementLocated(this.employeeHeader),
            30000
        );

        await this.driver.wait(
            until.elementIsVisible(header),
            30000
        );

        return header.isDisplayed();
    }

    // Search Employee
    async searchEmployee(employeeName) {

        const searchBox = await this.driver.wait(
            until.elementLocated(this.employeeNameSearch),
            20000
        );

        await this.driver.wait(
            until.elementIsVisible(searchBox),
            20000
        );

        await searchBox.sendKeys(employeeName);

        const searchBtn = await this.driver.wait(
            until.elementLocated(this.searchButton),
            20000
        );

        await this.driver.wait(
            until.elementIsVisible(searchBtn),
            20000
        );

        await searchBtn.click();
    }

    // Verify Search Results
    async verifySearchResults() {

        const table = await this.driver.wait(
            until.elementLocated(this.resultTable),
            20000
        );

        await this.driver.wait(
            until.elementIsVisible(table),
            20000
        );

        return table.isDisplayed();
    }

}

module.exports = PIMPage;