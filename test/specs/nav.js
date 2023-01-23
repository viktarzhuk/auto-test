describe('Navigation menu', () => {
    beforeEach(async function() {
        await browser.maximizeWindow();
    });
    
    it('Get the text of multiple elements of the page and assert them',async () => {
       await browser.url('/')
       await $('#menu-item-489').waitForClickable()
        const navLinks = await $$("#primary-menu [id*='menu']");
        const expectedTitles = [ 
            'Home',
            'About',
            'Shop',
            'Blog',
            'Contact',
            'My account',
        ]

        const actualTitles = [];
        for (const link of navLinks) {
            actualTitles.push(await link.getText())
        }
        await expect(actualTitles).toEqual(expectedTitles)
    });
});