import ContactPage from '../pages/contact-page';

describe('Contact Form', () => {
    beforeEach(async function () {
        await browser.maximizeWindow()
    });
    
    it('Fill in the contact form and assert the alert message of success',async () => {
        await ContactPage.open();
        // await browser.url('/');
        const navMenu = await ContactPage.NavComponent.linksNavMenu;
        for (const link of navMenu) {
            if (await link.getText() === 'Contact') {
                await link.click()
            }
        }
        await ContactPage.submitContactForm("Viktar", "admin@mail.com", "+500514645", "This is test message for testing")
        await ContactPage.alertMsg.waitForDisplayed({timeout: 8000});
        await expect(ContactPage.alertMsg).toHaveText('Thanks for contacting us! We will be in touch with you shortly')

        // await $('#evf-277-field_ys0GeZISRs-1').setValue('Viktar');
        // await $('#evf-277-field_LbH5NxasXM-2').setValue('admin@mail.com');
        // await $('#evf-277-field_66FR384cge-3').setValue('+500514645');
        // await $('#evf-277-field_yhGx3FOwr2-4').setValue('This is test message for testing');
        // await $('#evf-submit-277').click()
        // await $("[role='alert']").waitForDisplayed({timeout: 8000});
        // await expect($("[role='alert']")).toHaveText('Thanks for contacting us! We will be in touch with you shortly')
    });
});