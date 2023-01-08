/// <reference types="cypress" />

import "cypress-network-idle";
import { join } from "path";

const VegaURL = "/VegaPlusDEMO/login.html";

const MetaDataFileName = "metadata_1983.xml";
const ModuleName = "Vovan Ovsyukov Test Module";

context("Files", () => {
  beforeEach(() => {
    cy.visit(VegaURL);
  });

  it("should load the Vega and show login page", () => {
    cy.login("ADMIN", "ADMIN");

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
