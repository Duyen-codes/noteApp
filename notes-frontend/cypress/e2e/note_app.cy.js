import Context from "@mui/base/TabsUnstyled/TabsContext";

describe("Note app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });
  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains(
      "Note app, Department of Computer Science, University of Helsinki 2022"
    );
  });

  it("user can login", () => {
    cy.get('a[href*="login"]').click();
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("salainen");
    cy.get("#login-button").click();
    // this row ensures taht login was successful
    cy.contains("Welcome Matti Luukkainen. You are now logged-in");
  });
});
