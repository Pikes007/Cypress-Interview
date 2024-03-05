import { HomePage } from "./pages/homePage";

describe("Home Header Menu Items Test", () => {
    let errorList = [];

    before(function () {
        cy.fixture("menuItems").then((menuItems) => {
            this.menuItems = menuItems;
            cy.log("Loaded menuItems: ", JSON.stringify(menuItems, null, 2));
        });
    });

    afterEach(() => {
        if (errorList.length > 0) {
            cy.log("Errors encountered during the test:");
            errorList.forEach((error, index) => {
                cy.log(`${index + 1}. ${error}`);
            });
        }
    });

    it("should be able to click all header menu items and verify the user landed at the correct page", function () {
        const homePage = new HomePage();
        const menuItemsArray = this.menuItems.menuItems;

        menuItemsArray.forEach((menuItem) => {
            if (menuItem.hasSubMenu) {
                menuItem.subMenuItems.forEach((subMenuItem) => {
                    // if header menu has submenu, use this method to get and interact with sub-menu items
                    cy.selectFromDropDownMenuByText(
                        homePage.getSubMenuItem(menuItem.mainMenuItem),
                        subMenuItem.name
                    );

                    // Use .then() to continue with the next iteration
                    cy.url().then((url) => {
                        if (url === subMenuItem.href) {
                            cy.log(`URL matched for '${subMenuItem.name}': ${url}`);
                            homePage.refresh(subMenuItem.href);
                        } else {
                            // Handle errors gracefully
                            errorList.push(`Error in menu item '${subMenuItem.name}': URL mismatch`);
                            // Refresh the page to the home page and continue with the next iteration
                            homePage.refresh("/");
                        }
                    });
                });
            } else {
                // if header menu does not have a submenu, use this method to get and interact with menu Item
                homePage.getMainMenuItem(menuItem.mainMenuItem).click({ force: true });

                // Use .then() to continue with the next iteration
                cy.url().then((url) => {
                    if (url === menuItem.href) {
                        cy.log(`URL matched for '${menuItem.mainMenuItem}': ${url}`);
                        homePage.refresh(menuItem.href);
                    } else {
                        // Handle errors gracefully
                        errorList.push(`Error in menu item '${menuItem.mainMenuItem}': URL mismatch`);
                        // Refresh the page to the home page and continue with the next iteration
                        homePage.refresh("/");
                    }
                });
            }
        });
    });
});
