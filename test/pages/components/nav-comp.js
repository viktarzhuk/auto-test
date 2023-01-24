class NavComponent  {
    get linksNavMenu () {
        return $$("#primary-menu [id*='menu']")
    }

    get firstNavMenuElem () {
        return $('#primary-menu li')
    }
}
export default new NavComponent();