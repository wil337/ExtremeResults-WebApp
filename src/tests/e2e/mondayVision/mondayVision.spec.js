var DailyOutcomePage = require('../common/createOutcome.po.js');
var OverviewPage = require('../overview/overview.po.js');
var Login = require('../login/login.po.js');
var Common = require('../common/common.js');

describe('Daily Outcome Page', function () {

    var dailyOutcomePage = new DailyOutcomePage();
    var overviewPage = new OverviewPage();
    var login = new Login();
    var common = new Common();

    beforeAll(function () {
        common.clearDB();
        browser.driver.manage().deleteAllCookies();

        common.goHome();
        login.setLoginUserName('bjaanes');
        login.setPassword('1234');
        login.loginButton.click();
        browser.waitForAngular();
    });

    beforeEach(function () {
        common.dailyOutcomeMenuButton.click();
    });

    it('should be able to create a new daily outcome', function () {
        dailyOutcomePage.outcome1InputField.sendKeys('Outcome number 1');
        dailyOutcomePage.outcome2InputField.sendKeys('Outcome number 2');
        dailyOutcomePage.outcome3InputField.sendKeys('Outcome number 3');

        dailyOutcomePage.saveButton.click();

        common.overviewMenuButton.click();

        expect(overviewPage.currentOutcomes.count()).toBe(1);

    });

});