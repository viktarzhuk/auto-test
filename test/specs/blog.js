describe('Blog page', () => {
    beforeEach(async function () {
        await browser.maximizeWindow();
    });
    
    it('Get the list of recent posts and assert the list length',async () => {
        await browser.url('/');
        const navMenu = await $$("#primary-menu [id*='menu']");
        for (const link of navMenu) {
            if (await link.getText() === 'Blog') {
                await link.click()
            }
        }

        const recentPosts = await $$('#recent-posts-3 ul li');
        for (const item of recentPosts) {
            const text = await item.getText();
            await expect(text.length).toBeGreaterThan(10);
        }
        await expect(recentPosts).toHaveLength(5)

    });
});