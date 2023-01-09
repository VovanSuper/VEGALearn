/// <reference types="cypress" />

import "cypress-network-idle";
import { join } from "path";

const VegaURL = `/${Cypress.env("VegaDBName")}/login.html`;

const MetaDataFileName = Cypress.env("ModuleFileName");
const ModuleName = Cypress.env("ModuleName");
const name = Cypress.env("user");
const pass = Cypress.env("pass");

console.log({ name, pass });

context("Files", () => {
  beforeEach(() => {
    cy.visit(VegaURL);
  });

  it("should login as admin, upload metadata file, and login in the module", () => {
    cy.login(name, pass);

    cy.get("#x-auto-0-input").get(".DNUDVB-j-l").click();
    cy.contains("Администратор").click();
    cy.wait(400);
    cy.contains("OK").click();

    cy.contains("Файл").click();

    cy.wait(400);

    cy.contains("Загрузить конфигурацию").click();

    cy.wait(500);

    cy.get("input[type=file]").selectFile(
      join(__dirname, "../", MetaDataFileName)
    );
    cy.wait(400);
    cy.contains("Ok").click();

    // cy.waitForNetworkIdle();
    cy.wait(25000);

    cy.contains("Результат выполнения:")
      .parent()
      .parent()
      .parent()
      .parent()
      .parent()
      .contains("Ok")
      .click({ force: true });

    cy.wait(200);

    cy.contains("Да").click({ force: true });

    cy.get("#x-auto-0-input").get(".DNUDVB-j-l").click({ log: true });
    cy.contains(ModuleName).click();
    cy.wait(200);
    cy.contains("OK").click();
  });
});
