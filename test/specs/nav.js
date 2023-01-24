import HomePage from '../pages/home-page';

describe('Navigation menu', () => {
    beforeEach(async function() {
        await browser.maximizeWindow();
    });
    
    it('Get the text of multiple elements of the page and assert them',async () => {
       await browser.url('/')
       //await $('#menu-item-489').waitForClickable()
       //using waitUnitl
       await browser.waitUntil(async function () {
            const homeText = await HomePage.NavComponent.firstNavMenuElem.getText()
            return homeText === "Home"; // return true or false, so waiting will be untill the return = true
       }, {
        timeoutMsg: 'Could not find "Home" element on the page' // adding error message in case the element won't be found 
       })
        const navLinks = await HomePage.NavComponent.linksNavMenu;
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