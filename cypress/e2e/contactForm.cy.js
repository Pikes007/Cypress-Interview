/*
Task: visit https://aluminati.net, browse to the contact form, and fill out the form with whatever details you deem appropriate.
You will not be able to submit the form as it's behind a CAPTCHA, but simply filling out the data is enough for this exercise.
*/

import { expect } from "chai";

import { ContactPage } from "./pages/contactPage";

const contactPage = new ContactPage();

describe("Contact form", () => {
    it("should be able to fill out the contact form", () => {
        // Step 1: Visit contact page
        contactPage.visitContactPage();

        // Step 2: Fill out the contact form
        contactPage.fillContactForm(
            "Peter",
            "Mandes",
            "pmmandes@gmail.com",
            "0817043642",
            "Potentiam",
            "QA tester",
            "Test"
        );

        // Step 3: Submit the contact form
        contactPage.submitContactForm();

        // Step 4: Assert the thank you message is visible
        contactPage.assertThankYouMessageVisible();
    });
});
