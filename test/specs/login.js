describe('Vital Law', () => {
beforeEach(async() => {
    await browser.maximizeWindow();
});

    it('Login to the app',async () => {
        await browser.url('https://wkcheetah.com/')
        await $("input[type='email']").setValue('viktar.pazniak@wolterskluwer.com');
        await $("//button[text()='CONTINUE']").click();
        await $("input[name='password']").setValue('password');
        await $("//button[text()='LOG IN']").click();
        await $("//button[text()='Accept All Cookies']").click();
        await expect(browser).toHaveTitleContaining('VitalLaw');
      
    });
});