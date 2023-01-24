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

    get txtHeading () {
        return $('.elementor-widget-container h1')
    }
}
export default new HomePage();