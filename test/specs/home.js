

// Practice E-Commerce Site – Automation Bro
describe('Home page', () => {
    beforeEach(async function() {
        browser.maximizeWindow()
    });

    it('Navigate to the home page and assert the page title',async () => {
        await browser.url('/');
        await expect(browser).toHaveTitle('Practice E-Commerce Site – Automation Bro')
    });

    it('Navigate to the URL and assert the URL',async () => {
        await browser.url('/about');
        const urlTitle = await browser.getUrl();
        await expect(urlTitle).toEqual("https://practice.automationbro.com/about/")
    });
});
