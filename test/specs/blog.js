import BlogPage from '../pages/blog-page';

describe('Blog page', () => {
    beforeEach(async function () {
        await browser.maximizeWindow();
    });
    
    it('Get the list of recent posts and assert the list length',async () => {
        await BlogPage.open();
        await BlogPage.navMenu.waitForDisplayed();
        const navMenu = await BlogPage.NavComponent.linksNavMenu;
        for (const link of navMenu) {
            if (await link.getText() === 'Blog') {
                await link.click()
            }
        }

        const recentPosts = await BlogPage.postList;
        for (const item of recentPosts) {
            const text = await item.getText();
            await expect(text.length).toBeGreaterThan(10);
        }
        await expect(recentPosts).toHaveLength(5);

    });
});