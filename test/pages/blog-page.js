import NavComponent from '../pages/components/nav-comp';

class BlogPage {
    open () {
        return browser.url('/');
    }

    get navMenu () {
        return $("#primary-menu");
    }

    get postList () {
        return $$('#recent-posts-3 ul li');
    }

    get NavComponent () {
        return NavComponent;
    }

}
export default new BlogPage();