describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
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

  it("login fails with wrong password", function () {
    cy.get('a[href*="login"]').click();
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.contains("Wrong username or password");
    cy.get(".message").contains("Wrong username or password");
    cy.get(".message")
      .should("contain", "Wrong username or password")
      .and("have.css", "border-style", "solid");
    cy.get("html").should(
      "not.contain",
      "Welcome Matti Luukkainen. You are now logged-in"
    );
  });

  // Testing new note form
  describe("when logged in", function () {
    // only logged-in users can create new notess, so logging in to the app added to a beforeEach block

    // Bypassing the UI, do HTTP request to the backend to log in instead of logging in by filling a form
    // beforeEach(function () {
    //   cy.get('a[href*="login"]').click();
    //   cy.get("#username").type("mluukkai");
    //   cy.get("#password").type("salainen");
    //   cy.get("#login-button").click();
    // });

    // MAKE LOGIN CODE A CUSTOM COMMAND IN cypress/support/commands.js
    // beforeEach(function () {
    //   cy.request("POST", "http://localhost:3001/api/login", {
    //     username: "mluukkai",
    //     password: "salainen",
    //   }).then((response) => {
    //     console.log("response in then", response);
    //     localStorage.setItem(
    //       "loggedNoteappUser",
    //       JSON.stringify(response.body)
    //     );
    //     cy.visit("http://localhost:3000");
    //   });
    // });

    beforeEach(function () {
      cy.login({ username: "mluukkai", password: "salainen" });
    });

    it("a new note can be created", function () {
      cy.contains("new note").click();
      cy.get("input").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });

    describe("and a note exists", function () {
      // beforeEach(function () {
      //   cy.contains("new note").click();
      //   cy.get("input").type("another note cypress");
      //   cy.contains("save").click();
      // });

      beforeEach(function () {
        cy.createNote({
          content: "another note cypress",
          important: false,
        });
      });

      it("it can be made important", function () {
        cy.contains("another note cypress");
        cy.get('a[href*="mynotes"]').click();
        cy.get("#mark-important").click();
        cy.contains("another note cypress");
        cy.get("#unmark-important");
      });
    });
  });
});
