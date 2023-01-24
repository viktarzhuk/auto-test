import ContactPage from '../pages/contact-page';
import { faker } from '@faker-js/faker';

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
        await ContactPage.submitContactForm(faker.name.fullName(), faker.internet.email(), faker.phone.number(), faker.lorem.paragraphs(3))
        await ContactPage.alertMsg.waitForDisplayed({timeout: 8000});
        await expect(ContactPage.alertMsg).toHaveText('Thanks for contacting us! We will be in touch with you shortly');
    });
});