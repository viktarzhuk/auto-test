describe('Vital Law', () => {
beforeEach(async() => {
    await browser.maximizeWindow();
});

    it('Login to the app',async () => {
        await browser.url('https://wkcheetah.com/')
        await $("input[type='email']").setValue('');
        await $("//button[text()='CONTINUE']").click();
        await $("input[name='password']").setValue('');
        await $("//button[text()='LOG IN']").click();
        await $("//button[text()='Accept All Cookies']").click();
        await expect(browser).toHaveTitleContaining('VitalLaw');
    });

    it('Login and perform search',async () => {
        await browser.url('https://wkcheetah.com/')
        await $("input[type='email']").setValue('');
        await $("//button[text()='CONTINUE']").click();
        await $("input[name='password']").setValue('');
        await $("//button[text()='LOG IN']").click();
        await $("//button[text()='Accept All Cookies']").click();
        await $('[search-id="$search.getSearch().id"]').setValue('irc 1');
        await $('button[type="submit"]').click();
        await $("div[class='resultsGroupTitle ng-scope']").waitForDisplayed();
        const element = await $("[visited-link='irc01011e8d80bf0a5ea86573285e0669a396']").getText();
        expect(element).toEqual('Current Internal Revenue Code, History Notes - SEC. 1, TAX IMPOSED.— History notes applicable to entire section.');
    });

    it('Logout',async () => {
        await browser.url('https://wkcheetah.com/')
        await $("input[type='email']").setValue('');
        await $("//button[text()='CONTINUE']").click();
        await $("input[name='password']").setValue('');
        await $("//button[text()='LOG IN']").click();
        await $("//button[text()='Accept All Cookies']").click();
        await $("button[title='User Menu']").click();
        await $('li[class="logout"]').click();
        await expect($('form[name="loginForm"]')).toBeDisplayed();
    });
});