// productPage.js
export class ProductPage {
    burgerBars = ".awb-icon-bars";
    burgerMenu = "nav[aria-label='Main Menu Mobile']";
    productDropdown = "#mobile-menu-item-2862 > button";
    aluminateForEducationLink = "#mobile-menu-item-12764";
    contact = "#mobile-menu-item-1040";

    visitAluminateForEducation() {
        //cy.viewport("iphone-x").visit("/");
        cy.visit("/");
        cy.get(this.burgerBars).click();
        cy.get(this.burgerMenu).waitForParentVisible();
        cy.get(this.productDropdown).click();
        cy.get(this.aluminateForEducationLink).click();
    }

    collectHrefValues() {
        // Collect href values from all anchor tags and log to console
        cy.get("a").each(($a) => {
            const hrefValue = $a.attr("href");
            if (hrefValue) {
                cy.log(`Href value: ${hrefValue}`);
            }
        });
    }
}
