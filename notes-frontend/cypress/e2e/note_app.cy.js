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

  // Testing new note form
  describe("when logged in", function () {
    // only logged-in users can create new notess, so logging in to the app added to a beforeEach block
    beforeEach(function () {
      cy.get('a[href*="login"]').click();
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();
    });

    it("a new note can be created", function () {
      cy.contains("new note").click();
      cy.get("input").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });
  });
});
