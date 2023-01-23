describe('Testing iFrames', () => {
    beforeEach(async () => {
        await browser.maximizeWindow();
    });
    
    it('Switching browser to frame and back',async () => {
        await browser.url('/iframe-sample/');
        const iFrame = await $('#advanced_iframe');
        await iFrame.waitForDisplayed({timeout: 5000})
        await browser.switchToFrame(iFrame);
        await expect($('div #site-logo-inner')).toExist();
        await browser.switchToParentFrame();
        await $('.custom-logo').click();
        await expect(browser).not.toHaveUrlContaining('iframe-sample');

    });
});