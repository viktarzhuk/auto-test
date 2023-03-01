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


    it.only('Click Contact Us link on the page', async () => {
        await browser.url('http://www.webdriveruniversity.com/');
        await $('#contact-us').click()
        await browser.switchWindow('WebDriver | Contact Us')
        await $('[name=contactme]').toBeDisplayed()
    });




});