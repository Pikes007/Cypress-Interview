/**
 * Custom Cypress command to fill in a form field with the specified input.
 * @param {string} selector - The CSS selector of the form field.
 * @param {string} input - The input to be typed into the form field.
 */
Cypress.Commands.add("fillInForm", (selector, input) => {
    cy.get(selector).type(input);
});

/**
 * Custom Cypress command to wait for the parent of the subject element to become visible.
 * @param {Object} subject - The subject element whose parent will be checked for visibility.
 * @returns {Object} - The Cypress chainable object representing the visibility check.
 */
Cypress.Commands.add(
    "waitForParentVisible",
    { prevSubject: "element" },
    (subject) => {
        return cy.wrap(subject).parent().should("be.visible");
    }
);

/**
 * Custom Cypress command to select a menu option from a dropdown by matching the text.
 * @param {string} mainMenuSelector - The CSS selector of the dropdown menu.
 * @param {string} textToMatch - The text to match for selecting the menu option.
 */
Cypress.Commands.add(
    "selectFromDropDownMenuByText",
    (mainMenuSelector, textToMatch) => {
        let foundMatch = false;

        cy.get(mainMenuSelector).each(($item) => {
            const text = $item.text().trim();

            if (text.includes(textToMatch)) {
                foundMatch = true;
                cy.xpath(
                    `(//span[contains(text(),'${textToMatch}')])[1]`
                ).click({ force: true });

                if (foundMatch) {
                    cy.log(
                        `Successfully matched and visited Menu Option: ${textToMatch}`
                    );
                }
            } else {
                cy.log(`No menu item matched the text: ${textToMatch}`);
            }
        });
    }
);
