class HomePage {
    open () {
        return browser.url('/')
    }

    get btnGetStarted() {
        return $('#get-started')
    }
}
export default new HomePage();