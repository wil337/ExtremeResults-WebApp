var ReflectionsPage = require('./reflections.po');
var OutcomesPage = require('../outcomes/outcomes.po');
var Login = require('../login/login.po.js');
var Common = require('../common/common.js');

describe('Reflections Page', function () {

    var reflectionsPage = new ReflectionsPage();
    var outcomesPage = new OutcomesPage();
    var login = new Login();
    var common = new Common();



    describe('Create Weekly Reflection', function () {
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
            common.reflectionsMenuButton.click();
            reflectionsPage.createNewReflectionButton.click();
            reflectionsPage.createNewReflectionWeeklyReflectionSubChoiceButton.click();
        });

        it('should have no related entries before any related entries exist', function (){
            expect(reflectionsPage.relatedEntries.count()).toBe(0);
        });

        it('should show error messages when trying to save with missing fields', function () {
            reflectionsPage.saveButton.click();

            expect(reflectionsPage.reflectionsHeader.isPresent()).toBe(true);
            expect(reflectionsPage.firstThingThatWentWellInputFieldMessage.getText()).toBe('This is required.');
            expect(reflectionsPage.secondThingThatWentWellInputFieldMessage.getText()).toBe('This is required.');
            expect(reflectionsPage.thirdThingThatWentWellInputFieldMessage.getText()).toBe('This is required.');
            expect(reflectionsPage.firstThingToImproveInputFieldMessage.getText()).toBe('This is required.');
            expect(reflectionsPage.secondThingToImproveInputFieldMessage.getText()).toBe('This is required.');
            expect(reflectionsPage.thirdThingToImproveInputFieldMessage.getText()).toBe('This is required.');
        });


        it('should be able to create a new weekly reflection', function () {
            reflectionsPage.firstThingThatWentWellInputField.sendKeys('First thing that went well');
            reflectionsPage.secondThingThatWentWellInputField.sendKeys('Second thing that went well');
            reflectionsPage.thirdThingThatWentWellInputField.sendKeys('Third thing that went well');
            reflectionsPage.firstThingToImproveInputField.sendKeys('First thing to improve');
            reflectionsPage.secondThingToImproveInputField.sendKeys('First thing to improve');
            reflectionsPage.thirdThingToImproveInputField.sendKeys('First thing to improve');

            reflectionsPage.saveButton.click();

            common.overviewMenuButton.click();
        });

        it('should show related entries', function () {
            common.outcomesMenuButton.click();
            outcomesPage.createNewOutcomeButton.click();
            outcomesPage.createNewOutcomeWeeklyOutcomeSubChoiceButton.click();

            outcomesPage.outcome1InputField.sendKeys('Outcome number 1');
            outcomesPage.outcome2InputField.sendKeys('Outcome number 2');
            outcomesPage.outcome3InputField.sendKeys('Outcome number 3');

            outcomesPage.saveButton.click();

            common.overviewMenuButton.click();

            common.reflectionsMenuButton.click();
            reflectionsPage.createNewReflectionButton.click();
            reflectionsPage.createNewReflectionWeeklyReflectionSubChoiceButton.click();
            expect(reflectionsPage.relatedEntries.count()).toBe(1);
        });
    });

    describe('Create Monthly Reflection', function () {
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
            common.reflectionsMenuButton.click();
            reflectionsPage.createNewReflectionButton.click();
            reflectionsPage.createNewReflectionMonthlyReflectionSubChoiceButton.click();
        });

        it('should have no related entries before any related entries exist', function (){
            expect(reflectionsPage.relatedEntries.count()).toBe(0);
        });

        it('should show error messages when trying to save with missing fields', function () {
            reflectionsPage.saveButton.click();

            expect(reflectionsPage.reflectionsHeader.isPresent()).toBe(true);
            expect(reflectionsPage.firstThingThatWentWellInputFieldMessage.getText()).toBe('This is required.');
            expect(reflectionsPage.secondThingThatWentWellInputFieldMessage.getText()).toBe('This is required.');
            expect(reflectionsPage.thirdThingThatWentWellInputFieldMessage.getText()).toBe('This is required.');
            expect(reflectionsPage.firstThingToImproveInputFieldMessage.getText()).toBe('This is required.');
            expect(reflectionsPage.secondThingToImproveInputFieldMessage.getText()).toBe('This is required.');
            expect(reflectionsPage.thirdThingToImproveInputFieldMessage.getText()).toBe('This is required.');
        });

        it('should be able to create a new monthly reflection', function () {
            reflectionsPage.firstThingThatWentWellInputField.sendKeys('First thing that went well');
            reflectionsPage.secondThingThatWentWellInputField.sendKeys('Second thing that went well');
            reflectionsPage.thirdThingThatWentWellInputField.sendKeys('Third thing that went well');
            reflectionsPage.firstThingToImproveInputField.sendKeys('First thing to improve');
            reflectionsPage.secondThingToImproveInputField.sendKeys('First thing to improve');
            reflectionsPage.thirdThingToImproveInputField.sendKeys('First thing to improve');

            reflectionsPage.saveButton.click();
        });

        it('should show related entries', function () {
            common.outcomesMenuButton.click();
            outcomesPage.createNewOutcomeButton.click();
            outcomesPage.createNewOutcomeMonthlyOutcomeSubChoiceButton.click();

            outcomesPage.outcome1InputField.sendKeys('Outcome number 1');
            outcomesPage.outcome2InputField.sendKeys('Outcome number 2');
            outcomesPage.outcome3InputField.sendKeys('Outcome number 3');

            outcomesPage.saveButton.click();

            common.overviewMenuButton.click();

            common.reflectionsMenuButton.click();
            reflectionsPage.createNewReflectionButton.click();
            reflectionsPage.createNewReflectionMonthlyReflectionSubChoiceButton.click();
            expect(reflectionsPage.relatedEntries.count()).toBe(1);
        });
    });

});