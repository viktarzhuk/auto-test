class HomePage {
    open () {
        return browser.url('/')
    }

    get btnGetStarted() {
        return $('#get-started')
    }

    get logoBtn () {
        return $("img[alt='Practice E-Commerce Site']")
    }
}
export default new HomePage();