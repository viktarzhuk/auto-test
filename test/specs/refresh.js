import { faker } from '@faker-js/faker';

describe('Test to refresh the syntax', () => {
    beforeEach(async function () {
        await browser.maximizeWindow()
    });

    it('Navigate to the page and assert the URL', async () => {
        await browser.url('http://www.webdriveruniversity.com/')
        const urlTitle = await browser.getUrl()
        expect(urlTitle).toEqual('http://www.webdriveruniversity.com/')
    });

    it('Navigate to the page and assert the page title', async () => {
        await browser.url('http://www.webdriveruniversity.com/');
        await expect(browser).toHaveTitle('WebDriverUniversity.com')
    });


    it('Click Contact Us link on the page', async () => {
        await browser.url('http://www.webdriveruniversity.com/');
        await $('#contact-us').click()
        await browser.switchWindow('http://www.webdriveruniversity.com/Contact-Us/')
        await $('h2[class=section_header]').waitForExist()
    });

    it('Fill the contact form with some info and click submit button', async () => {
        await browser.url('http://www.webdriveruniversity.com/');
        await $('#contact-us').click();
        await browser.switchWindow('http://www.webdriveruniversity.com/Contact-Us/');
        await $('input[name = first_name]').setValue('Viktar');
        await $('input[name = last_name]').setValue('Zhuk');
        await $('input[name = email]').setValue('test@gmail.com');
        await $('textarea[name = message]').setValue('Hello, this is test message');
        await $('input[type=submit]').click();
        const pageText = await $("//*[text() = 'Thank You for your Message!']").getText()
        await expect(pageText).toEqual('Thank You for your Message!')
    });

    it('Fill the contact form with some info and click reset button', async () => {
        await browser.url('http://www.webdriveruniversity.com/');
        await $('#contact-us').click();
        await browser.switchWindow('http://www.webdriveruniversity.com/Contact-Us/');
        await $('input[name = first_name]').setValue('Viktar');
        await $('input[name = last_name]').setValue('Zhuk');
        await $('input[name = email]').setValue('test@gmail.com');
        await $('textarea[name = message]').setValue('Hello, this is test message');
        await $('input[type=reset]').click()
        const placeholder = await $('input[name = first_name]').getAttribute('placeholder')
        await expect(placeholder).toEqual('First Name')
    });

    it('Fill in the contact form with random data and submit', async () => {
        await browser.url('http://www.webdriveruniversity.com/');
        await $('#contact-us').click();
        await browser.switchWindow('http://www.webdriveruniversity.com/Contact-Us/');
        await $('input[name = first_name]').setValue(faker.name.firstName());
        await $('input[name = last_name]').setValue(faker.name.lastName());
        await $('input[name = email]').setValue(faker.internet.email());
        await $('textarea[name = message]').setValue(faker.lorem.paragraphs(2));
        await $('input[type=reset]').click();
        const placeholder = await $('input[name = first_name]').getAttribute('placeholder')
        await expect(placeholder).toEqual('First Name');
    });

    it('Navigate to login form page and assert the page title', async () => {
        await browser.url('http://www.webdriveruniversity.com/');
        await $('#login-portal').click()
        await browser.switchWindow('http://www.webdriveruniversity.com/Login-Portal/');
        await expect(browser).toHaveUrlContaining('Login-Portal')
        await expect($('#text')).toBeDisplayed()
    });

    it('Enter credentials and interact with browser alert window', async () => {
        await browser.url('http://www.webdriveruniversity.com/');
        await $('#login-portal').click()
        await browser.switchWindow('http://www.webdriveruniversity.com/Login-Portal/');
        await $('#text').setValue(faker.name.firstName());
        await $('#password').setValue(faker.internet.password(8))
        await $('#login-button').click()
        await expect(await browser.getAlertText()).toBe('validation failed')
        await browser.acceptAlert()
    });

    it('Navigate to button clicks page and assert page title', async () => {
        await browser.url('http://www.webdriveruniversity.com/');
        await $('#button-clicks').click()
        await browser.switchWindow('http://www.webdriveruniversity.com/Click-Buttons/')
        await expect(browser).toHaveTitle('WebDriver | Button Clicks')
    });

    it('Clicking buttons and interact with alerts', async () => {
        await browser.url('http://www.webdriveruniversity.com/Popup-Alerts/index.html')
        await $('#button1').click()
        await browser.acceptAlert()
        ///Next button
        await $('#button4').click()
        await browser.acceptAlert()
        const clickOK = await $('#confirm-alert-text').getText()
        await expect(clickOK).toEqual('You pressed OK!')
        await $('#button4').click()
        await browser.dismissAlert()
        const clickCancel = await $('#confirm-alert-text').getText()
        await expect(clickCancel).toEqual('You pressed Cancel!')
    });

    it('Injection of JS code into the page to make some elelements visible', async () => {
        await browser.url('http://www.webdriveruniversity.com/Hidden-Elements/index.html')
        await browser.execute(() => {
              return document.getElementById("not-displayed").setAttribute("id", "")
        });
        await $('#button1').isDisplayed();
    });

    it('Injection of JS code to make visible elements', async () => {
        await browser.url('http://www.webdriveruniversity.com/Hidden-Elements/index.html');
        await browser.execute(() => {
            return document.getElementById('visibility-hidden').setAttribute('id', '')
        })
        await $('#button2').isDisplayed();
    });

    it('Waiting for loader to dissapear',async () => {
        await browser.url('http://www.webdriveruniversity.com/Ajax-Loader/index.html');
        const spinner = await $('#loader')  
        await spinner.waitForDisplayed({reverse: true})
        await $('#button1').click()
        await $("#myModalClick").waitForDisplayed()
        const headerText = await $(".modal-title").getText()
        await expect(headerText).toEqual('Well Done For Waiting....!!!')
    });

    it('Interaction with iFrames', async () => {
        await browser.url('http://www.webdriveruniversity.com/IFrame/index.html');
        const iFrame = await $('#frame');
        await browser.switchToFrame(iFrame);
        await $('#button-find-out-more').waitForClickable();
        await $('#button-find-out-more').click();
        await $('.modal-body').waitForDisplayed();
        const bodyText = await $('.modal-body').getText();
        await expect(bodyText).toEqual('Welcome to webdriveruniversity.com we sell a wide range of electrical goods such as laptops, game consoles, cameras...')
        await browser.switchToParentFrame();
        await expect(browser).toHaveTitleContaining('WebDriver')
    });

    it('Interaction with tables: getting data',async () => {
        await browser.url('http://www.webdriveruniversity.com/Data-Table/index.html');
        await $('#t01').waitForDisplayed();
        const arr = await $$("//table[@id='t01']/tbody/tr/td")
        let actual = [];
        for (let i = 0; i < arr.length; i++) {
             actual.push(await arr[i].getText())
        }
        let expectedArr = ['John', 'Smith', '45', 'Jemma', 'Jackson', '94', 'Michael', 'Doe', '20']
        await expect(actual).toEqual(expectedArr)
    });
        
    it('Interaction with breadcrumbs: looping over and selecting one', async () => {
        await browser.url('http://www.webdriveruniversity.com/Data-Table/index.html');
        await $("//h2[text() = 'Breadcrumb']").waitForDisplayed();
        const breadcrumbs = await $$('.breadcrumb-item');
        for (const item of breadcrumbs) {
            if(await item.getText() === 'About Us') {
               await item.click()
            }
        }

    });
        
    it('Interaction with list of items: getting the text of all list items and compare with the expected number of items', async () => {
        await browser.url('http://www.webdriveruniversity.com/Data-Table/index.html');
        await $("//h2[text() = 'Lists']").waitForDisplayed();
        const listItems = await $$(".traversal-drinks-list > li");
        let actualItems = [];
        let expectedNumbOfItems = 5;
        for (let i = 0; i < listItems.length; i++) {
            actualItems.push(await listItems[i].getText())
        }
        console.log(actualItems)
        await expect(actualItems.length).toEqual(expectedNumbOfItems);
    });

    it('Interaction with autocomplete text field', async () => {
        await browser.url('http://www.webdriveruniversity.com/Autocomplete-TextField/autocomplete-textfield.html');
        await $('#myInput').setValue('A');
        await $('#myInputautocomplete-list').waitForDisplayed()
        const items = await $$('#myInputautocomplete-list > div');
        for (let i = 0; i < items.length; i++) {
            if(await items[i].getText() == 'Apple') {
                await items[i].click()
            }
        }
        await $('#submit-button').click();
    });

    it('Date picker: interaction with calendar', async () => {
        await browser.url('http://www.webdriveruniversity.com/Datepicker/index.html');
        await $('#datepicker').waitForDisplayed();
        await $('.glyphicon ').click();
        await $('.datepicker-switch').click();
        const months = await $$('.month');
        let monthsNumber = [];
        for (let i = 0; i < months.length; i++) {
            await monthsNumber.push(await months[i].getText())
        }
        await expect(monthsNumber.length).toEqual(12);
        await $('//tbody/tr/td/span[1]').click();
        const days = await $$('//tbody/tr/td');
        for (let i = 0; i < days.length; i ++) {
            if(await days[i].getText() == '1') {
             await days[i].click() 
             break;
            } 
        }
    });

    it('Hover over element on the page', async () => {
        await browser.url('http://www.webdriveruniversity.com/Scrolling/index.html')
        await $("//h1[text()='Scroll to me first!']").moveTo();
        await expect(await $('#zone1')).toHaveText('Well done for scrolling to me!');
        await $('#zone2').moveTo();
        await $('#zone1').moveTo();
        await $('#zone2').moveTo();
        await expect($('#zone2-entries')).toHaveText('2 Entries');
    });

    it('Dropdowns interactions', async () => {
        await browser.url('http://www.webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html');
        let values = await $$("//select[@id='dropdowm-menu-1']/option");
        console.log(values);
        await expect(values.length).toBe(4);
        await $("//select[@id='dropdowm-menu-1']").selectByIndex(1);
        await expect(await $('#dropdowm-menu-1').getValue()).toBe('c#');      
        await $('#dropdowm-menu-1').selectByAttribute('value','python')
        const actual = await $('#dropdowm-menu-1').getValue()
        await expect(actual).toEqual('python')
    });

    it('Radiobuttons interactions', async () => {
        await browser.url('http://www.webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html');
        const radiobuttons = await $$("//form[@id='radio-buttons-selected-disabled']/input");
        await expect(radiobuttons.length).toBe(3);
        await expect (await $("[value='lettuce']").isSelected()).toBe(false);
        await $("[value='lettuce']").click();
        await expect(await $("[value='lettuce']").isSelected()).toBe(true);
        await expect(await $("[value='cabbage']").isClickable()).toBe(false)
    });

    it('Checkboxes interactions', async () => {
        await browser.url('http://www.webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html');
        const checkboxes = await $$('[type=checkbox]');
        await expect(checkboxes.length).toBe(4);
        checkboxes.filter(async item => {
            if(await item.getValue() === 'option-2') {
                await item.click()
                expect(await item.toBeChecked()).toBe(true)
            }
        });
    });

    it('Drag n Drop execution', async () => {
        await browser.url('http://www.webdriveruniversity.com/Actions/index.html');
        const element = await $('#draggable');
        const target = await $('#droppable');
        await element.dragAndDrop(target);
        await expect(target).toHaveText('Dropped!');
    });

    it.only('Executing hover over elements in a sequence and asserting the browser alerts', async () => {
        await browser.url('http://www.webdriveruniversity.com/Actions/index.html');
        await $("//button[text()='Hover Over Me First!']").moveTo();
        await $("//a[@class='list-alert'][1]").click();
        await expect(await browser.getAlertText()).toBe('Well done you clicked on the link!');
        await browser.acceptAlert();
        await $("//button[text()='Hover Over Me Second!']").waitForClickable();
        await $("//button[text()='Hover Over Me Second!']").moveTo()
        await $("div:nth-of-type(2) > .dropdown-content > .list-alert").click()
        await expect(await browser.getAlertText()).toBe('Well done you clicked on the link!');
        await browser.acceptAlert();
        await $("//button[text()='Hover Over Me Third!']").moveTo();
        await $('div:nth-of-type(3) > .dropdown-content >  .list-alert').click();
        await expect(await browser.getAlertText()).toBe('Well done you clicked on the link!');
        await browser.acceptAlert();
    });


});