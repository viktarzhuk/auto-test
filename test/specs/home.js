import HomePage from '../pages/home-page';

// Practice E-Commerce Site – Automation Bro
describe('Home page', () => {
    beforeEach(async function() {
        browser.maximizeWindow()
    });

    it('Navigate to the home page and assert the page title',async () => {
        await HomePage.open();
        await expect(browser).toHaveTitle('Practice E-Commerce Site – Automation Bro')
    });

    it('Navigate to the URL and assert the URL',async () => {
        await browser.url('/about');
        const urlTitle = await browser.getUrl();
        await expect(urlTitle).toEqual('https://practice.automationbro.com/about/') // toEqual assertion from Jest library
        //await expect(browser).toHaveUrl('https://practice.automationbro.com/about/') // this do not require browser.getUrl().
    });

    it('Clicking the button and asert the URl contains correct title',async () => {
        await HomePage.open();
        await HomePage.btnGetStarted.click()
        await expect(browser).toHaveUrlContaining('#get-started')
    });

    it('Clikcing the page logo and assert the url NOT contain sertain text',async () => {
        await HomePage.open();
        await $('#get-started').click();
        await $("img[alt='Practice E-Commerce Site']").click();
        await expect(browser).not.toHaveUrlContaining('#get-started')
    });

    it('Find element, get it text and assert the text',async () => {
        await HomePage.open();
        await expect($('.elementor-widget-container h1')).toHaveText('Think different. Make different.') // we can do it using getText() command for the element and then assert
    });
});
