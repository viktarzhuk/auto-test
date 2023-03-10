describe('Test suite for amazon.com', () => {
    beforeEach(async () => {
        await browser.maximizeWindow();
        await browser.url('https://www.amazon.com/');
    });
    
    
    it('Navigate to amazon.com and asser the page title', async () => {
        await expect(browser).toHaveTitleContaining('Amazon');
    });

    it('Navigate to the page and check that nav header with main nav menu elements is displayed', async () => {
        await $('#navbar').isDisplayed();
        await $('#nav-logo-sprites').isDisplayed();
        await $('#glow-ingress-block').isDisplayed();
        await $('#nav-search').isDisplayed();
        await $('#icp-nav-flyout').isDisplayed();
        await $('#nav-link-accountList').isDisplayed();
        await $('#nav-orders').isDisplayed();
        await $('#nav-cart').isDisplayed();
    });

    it('Verify that "Choose your location" popup appears on clikcing "Deliver To" menu in the nav header menu ', async () => {
        await $('#nav-global-location-popover-link').waitForDisplayed();
        await $('#nav-global-location-popover-link').click();
        await $('#a-popover-header-1').waitForDisplayed();
        await expect($('#a-popover-header-1')).toHaveText('Choose your location');
    });

    it('Verify "Choose your location" popup elements', async () => {
        await $('#nav-global-location-popover-link').waitForDisplayed();
        await $('#nav-global-location-popover-link').click();
        await $('#a-popover-content-1').waitForDisplayed();
        await $("div#GLUXAddressBlock > .a-padding-none.a-row.a-section.a-spacing-small").waitForDisplayed();
        const text = await $("div#GLUXAddressBlock > .a-padding-none.a-row.a-section.a-spacing-small").getText();
        await expect(text).toEqual('Delivery options and delivery speeds may vary for different locations');
        const buttonText = await $('span#GLUXSignInButton  .a-button-text').getText();
        await expect(buttonText).toEqual('Sign in to see your addresses');
        await expect($("//h5[text()='or enter a US zip code']")).toHaveText('or enter a US zip code');
        await $('#GLUXZipUpdateInput').isDisplayed();
        await expect($('#GLUXZipUpdate-announce')).toHaveText('Apply')
        await expect($("//h5[text()='or']")).toHaveText('or');
        await $('#GLUXCountryList').isDisplayed();
        await expect($("button[name='glowDoneButton']")).toHaveText('Done')
    });

    it('Verify dropdown with the list of countries available for shipping in the "Choose your location" popup', async () => {
        await $('#nav-global-location-popover-link').waitForDisplayed();
        await $('#nav-global-location-popover-link').click();
        await $('#a-popover-content-1').waitForDisplayed();
        await $('#GLUXCountryList').waitForEnabled();
        await $("//span[@class='a-dropdown-prompt']").click();
        const dropdownItems = await $$("//ul[@role='listbox']/li/a");
        const itemText = await dropdownItems.map(function(item) {
            return item.getText()
        })
        await expect(itemText.length).toEqual(246)
    });

    it('Verify the value from the dropdown with list of countries can be selected', async () => {
        await $('#nav-global-location-popover-link').waitForDisplayed();
        await $('#nav-global-location-popover-link').click();
        await $('#a-popover-content-1').waitForDisplayed();
        await $('#GLUXCountryList').waitForEnabled();
        await $("//span[@class='a-dropdown-prompt']").click();
        await $("//ul[@role='listbox']/li/a[text()='Bahrain']").click();
        await expect($('#GLUXCountryValue')).toHaveText('Bahrain');
    });

    it('Verify that the selected country in the "Choose your location" popup is displayed in the global header nav menu after clicking "Done" button', async () => {
        await $('#nav-global-location-popover-link').waitForDisplayed();
        await $('#nav-global-location-popover-link').click();
        await $('#a-popover-content-1').waitForDisplayed();
        await $('#GLUXCountryList').waitForEnabled();
        await $("//span[@class='a-dropdown-prompt']").waitForDisplayed()
        await $("//span[@class='a-dropdown-prompt']").click();
        await $("//ul[@role='listbox']/li/a[text()='Bahrain']").click();
        await expect($('#GLUXCountryValue')).toHaveText('Bahrain');
        await $("button[name='glowDoneButton']").click();
        await expect($('#glow-ingress-line2')).toHaveText('Bahrain');
    });

    it('Verify the dropdown with search categories on the global header nav menu', async () => {
        const searchDropdown = await $$('#searchDropdownBox > option');
        await expect(searchDropdown.length).toEqual(28);
        const expectedTitles = [
            "All Departments",
            "Arts & Crafts",
            "Automotive",
            "Baby",
            "Beauty & Personal Care",
            "Books",
            "Boys' Fashion",
            "Computers",
            "Deals",
            "Digital Music",
            "Electronics",
            "Girls' Fashion",
            "Health & Household",
            "Home & Kitchen",
            "Industrial & Scientific",
            "Kindle Store",
            "Luggage",
            "Men's Fashion",
            "Movies & TV",
            "Music, CDs & Vinyl",
            "Pet Supplies",
            "Prime Video",
            "Software",
            "Sports & Outdoors",
            "Tools & Home Improvement",
            "Toys & Games",
            "Video Games",
            "Women's Fashion",
          ];
        let textOfItems = [];    
        for(let i = 0; i < searchDropdown.length; i++) {
            await textOfItems.push(await searchDropdown[i].getText())
        }
        await expect(textOfItems).toEqual(expectedTitles)
        await $('#searchDropdownBox').selectByAttribute('value', 'search-alias=automotive-intl-ship');
        await expect($('#nav-search-label-id')).toHaveText('Automotive')
    });

    it('Verify that cliking logo on header nav menu redirects user to the main page', async () => {
        await $('#nav-cart-count-container').waitForDisplayed();
        await $('#nav-cart-count-container').click();
        await expect($('.a-cardui-body.a-scroller-none h2')).toBeDisplayed();
        await $('#nav-logo-sprites').click()
        await $('.a-cardui-body.a-scroller-none h2').waitForDisplayed({reverse: true});
    });

    it('Verify the page is scrolled up on clikcing "Back to top" button', async () => {
        await $('#nav-search').waitForDisplayed();
        await $('#nav-search').isDisplayedInViewport();
        // await $("[aria-label='Back to top']").scrollIntoView();
        const element = await $("//a[@id='navBackToTop']//span[@class='navFooterBackToTopText']");
        await element.scrollIntoView({block: 'center', inline: 'center'})
        await element.click();
        await $('#nav-search').isDisplayedInViewport();
    });

    it('Verify search is available from the main page', async () => {
        await $('#twotabsearchtextbox').setValue('iphone 14 pro');
        await $('#nav-search-submit-button').click();
        await $("li[id='p_n_feature_two_browse-bin/23949378011']").scrollIntoView({block:'center'});
        // await browser.pause(4000)
        await $("li[id='p_n_feature_two_browse-bin/23949378011']").isDisplayedInViewport()
    });

    
});


