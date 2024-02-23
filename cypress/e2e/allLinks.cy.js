/*
Task: In mobile view, browse to `Products` -> `Aluminate for education` and get the value for every 
`href` on every anchor (`<a />` tag) on the page.

Output the `href` values to the console. Logging to cypress or the standard dev console is fine.

Please perform this entire task on the mobile site, including the navigation and link data fetching.
*/
import { ProductPage } from "./pages/productPage";

const productPage = new ProductPage();

describe("Get all links", () => {
    it("should be able to browse to the product page in mobile view and real all links", () => {
        productPage.visitAluminateForEducation();
        productPage.collectHrefValues();
    });
});
