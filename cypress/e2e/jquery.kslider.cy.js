
describe("Kslider.js", function() {

  describe("jQuery expectations", function() {

    it("should embedd jQuery", function() {
      expect(Cypress.$).to.be.not.undefined;
    });

  });

  describe("DOM expectations", function() {

    beforeEach(() => {
      cy.visit(Cypress.config('baseUrl'));
    });

  });

  describe("Behaviors", function() {

    beforeEach(function() {
      cy.visit(Cypress.config('baseUrl'));
    });

    xit ("should go to next picture", function() {

    });
  });
});