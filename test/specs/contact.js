import ContactPage from '../pages/contact-page';

describe('Contact Form', () => {
    beforeEach(async function () {
        await browser.maximizeWindow()
    });
    
    it('Fill in the contact form and assert the alert message of success',async () => {
        await ContactPage.open();
        const navMenu = await ContactPage.NavComponent.linksNavMenu;
        for (const link of navMenu) {
            if (await link.getText() === 'Contact') {
                await link.click()
            }
        }
        await ContactPage.submitContactForm("Viktar", "admin@mail.com", "+500514645", "This is test message for testing");
        await ContactPage.alertMsg.waitForDisplayed({timeout: 8000});
        await expect(ContactPage.alertMsg).toHaveText('Thanks for contacting us! We will be in touch with you shortly');
    });
});