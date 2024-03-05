import "cypress-xpath";

export const MainMenuItems = {
    Products: 2862,
    About: 16350,
    Resources: 16355,
    Pricing: 16354,
    Contact: 17180,
    "Request a Demo": 441,
};

/**
 * Class representing the HomePage and its interactions.
 */
export class HomePage {
    /**
     * Constructor for the HomePage class.
     * Visits the homepage upon instantiation.
     */
    constructor() {
        cy.visit("/");
    }

    // Logo Selectors
    homeRefreshLogo = ".fusion-logo";
    altHomeRefreshLogo = "//img[@id='image-165']";

    /**
     * Returns the CSS selector for the homepage logo.
     * @returns {string} - The CSS selector for the homepage logo.
     */
    getHomeRefreshLogo() {
        return ".fusion-logo";
    }

    /**
     * Returns the XPath selector for the alternate homepage logo.
     * @returns {string} - The XPath selector for the alternate homepage logo.
     */
    getAltHomeRefreshLogo() {
        return "//img[@id='image-165']";
    }

    /**
     * Returns the CSS selector for a specific product tab.
     * @param {string} itemName - The name of the menu item.
     * @returns {string} - The CSS selector for the specified product tab.
     */
    getProductsTabSelector(itemName) {
        return `li[id='menu-item-${MainMenuItems[itemName]}'] span[class='menu-text']`;
    }

    /**
     * Returns the alternate CSS selector for a specific product tab.
     * @param {string} itemName - The name of the menu item.
     * @returns {string} - The alternate CSS selector for the specified product tab.
     */
    getAlternateProductsTabSelector(itemName) {
        return `li[id='menu-item-${MainMenuItems[itemName]}'] span[class='menu-text fusion-button button-default button-medium']`;
    }

    /**
     * Returns the Cypress chainable object for a main menu item.
     * @param {string} selectMenuItem - The name of the menu item.
     * @returns {Object} - The Cypress chainable object for the specified main menu item.
     */
    getMainMenuItem(selectMenuItem) {
        let selectorToUse;

        if (selectMenuItem === "Request a Demo") {
            selectorToUse = this.getAlternateProductsTabSelector(selectMenuItem);
        } else if (selectMenuItem === "Home") {
            selectorToUse = this.homeRefreshLogo;
        } else {
            selectorToUse = this.getProductsTabSelector(selectMenuItem);
        }

        return cy.get(selectorToUse);
    }

    /**
     * Returns the CSS selector for a specific submenu item.
     * @param {string} selectSubMenuItem - The name of the submenu item.
     * @returns {string} - The CSS selector for the specified submenu item.
     */
    getSubMenuItem(selectSubMenuItem) {
        return `li[id='menu-item-${MainMenuItems[selectSubMenuItem]}']`;
    }

    /**
     * Navigates to the homepage or a specified URL based on the provided href.
     * @param {string} href - The URL to navigate to.
     * @returns {Object} - The Cypress chainable object representing the navigation action.
     */
    refresh(href) {
        let selectorToUse;

        if (href === "https://www.aluminati.net/pricing/") {
            selectorToUse = this.getAltHomeRefreshLogo();
            return cy.xpath(selectorToUse).click();
        } else if (href === "https://www.aluminati.net/request-a-demo/") {
            selectorToUse = this.getAltHomeRefreshLogo();
            return cy.xpath(selectorToUse).click();
        } else {
            selectorToUse = this.getHomeRefreshLogo();
            return cy.get(selectorToUse).click();
        }
    }

    /**
     * Collects href values from all anchor tags within the provided base selector and logs them to the console.
     * @param {string} baseSelector - The base selector to search for anchor tags.
     */
    collectHrefValues(baseSelector) {
        // Collect href values from all anchor tags within the provided base selector and log to console
        const hrefs = [];
        cy.get(`${baseSelector} a`).each(($a) => {
            const hrefValue = $a.attr("href");
            if (hrefValue) {
                hrefs.push(hrefValue);
                cy.log(`Href value: ${hrefValue}`);
            }
        });
    }
}
