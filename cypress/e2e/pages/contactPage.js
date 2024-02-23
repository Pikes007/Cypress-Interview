export class ContactPage {
    header_contact_button = "#menu-item-1040 > .fusion-bar-highlight";
    firstNameBox = "#firstname";
    lastNameBox = "#lastname";
    emailBox = "#email";
    phoneBox = "#phone";
    companyBox = '[id="field[1]"]';
    jobTitleBox = '[id="field[10]"]';
    messageBox = '[id="field[5]"]';
    submitFormButton = "#_form_17_submit";
    thankYouMessage = "._form-thank-you";

    visitContactPage() {
        cy.visit("/");
        cy.get(this.header_contact_button).should("be.visible").click();
    }

    fillContactForm(
        firstName,
        lastName,
        email,
        phone,
        company,
        jobTitle,
        message
    ) {
        cy.fillInForm(this.firstNameBox, firstName);
        cy.fillInForm(this.lastNameBox, lastName);
        cy.fillInForm(this.emailBox, email);
        cy.fillInForm(this.phoneBox, phone);
        cy.fillInForm(this.companyBox, company);
        cy.fillInForm(this.jobTitleBox, jobTitle);
        cy.fillInForm(this.messageBox, message);
    }

    submitContactForm() {
        cy.get(this.submitFormButton).click();
    }

    assertThankYouMessageVisible() {
        cy.get(this.thankYouMessage).scrollIntoView().should("be.visible");
    }
}
