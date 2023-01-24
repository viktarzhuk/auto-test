import NavComponent from '../pages/components/nav-comp';

class ContactPage {
    open () {
        return browser.url('/');
    }

    get NavComponent () {
        return NavComponent;
    }

    get inputName () {
        return $('#evf-277-field_ys0GeZISRs-1');
    }

    get inputEmail () {
        return $('#evf-277-field_LbH5NxasXM-2');
    }

    get inputPhone () {
        return $('#evf-277-field_66FR384cge-3');
    }

    get inputMessage () {
        return $('#evf-277-field_yhGx3FOwr2-4');
    }

    get submitFormBtn () {
        return $('#evf-submit-277');
    }

    get alertMsg () {
        return $("[role='alert']");
    }

    submitContactForm(name, email, phone, message) {
        this.inputName.setValue(name);
        this.inputEmail.setValue(email);
        this.inputPhone.setValue(phone);
        this.inputMessage.setValue(message);
        this.submitFormBtn.click();
    }

}
export default new ContactPage();