describe('service is available', function() {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    })

    const dropTarget = '[data-testid="drop-target"]';
    const bun = '[data-testid="ingredient-60d3b41abdacab0026a733c7"]';
    const sauce = '[data-testid="ingredient-60d3b41abdacab0026a733cd"]';
    const draggableSauce = '[data-testid="draggableitem-60d3b41abdacab0026a733cd"]';
    const modal = '[data-testid="modal-content"]';


    it('should be available on localhost:3000', function() {
        cy.visit('http://localhost:3000');
    });

    it("should open and close ingredient modal", () => {
        cy.get(bun).click();
        cy.get(modal).should("exist");
        cy.get(modal).contains('Флюоресцентная булка');
        cy.get(modal).find("svg").first().click();
        cy.get(modal).should("not.exist");
    });

    it('should drop bun to constructor and not remove bun', function() {
        cy.get(bun).trigger('dragstart');
        cy.get(dropTarget).trigger('drop');

        cy.get('[class$=constructor-element_pos_top]').should('exist');
        cy.get('[class$=constructor-element_pos_bottom]').should('exist');

        cy.get('[class$=constructor-element_pos_top]').should('exist')
            .find('*[class^="constructor-element__action"]')
            .trigger("click");
        cy.get('[class$=constructor-element_pos_top]').should("exist");
    });

    it('should drop other ingredient to constructor and remove it', function() {
        cy.get(sauce).trigger('dragstart');
        cy.get(dropTarget).trigger('drop');

        cy.get(draggableSauce).should('exist');

        cy.get(draggableSauce).should('exist')
            .find('*[class^="constructor-element__action"]')
            .trigger("click");
        cy.get('[class$=constructor-element_pos_top]').should("not.exist");
    });

    it("create order", () => {
        const baseUrl = Cypress.config('baseUrl');
        const orderTitle = 'Оформить заказ';
        cy.get(bun).trigger('dragstart');
        cy.get(dropTarget).trigger('drop');
        cy.get(sauce).trigger('dragstart');
        cy.get(dropTarget).trigger('drop');

        cy.contains(orderTitle).click();
        cy.url().should('eq', `${baseUrl}/login`);
        cy.get('input[name="email"]').type('test1237@test.ru');
        cy.get('input[name="password"]').type('12345');
        cy.get('[class^=button]').click();

        cy.url().should('eq', `${baseUrl}/`);
        cy.contains(orderTitle).click();
        cy.wait(16000);
        cy.get(modal).contains('Ваш заказ начали готовить');
        cy.get(modal).find("svg").first().click();
        cy.get(modal).should("not.exist");
    })

    it("should be constructor is empty", () => {
        cy.get(dropTarget).contains('Начни собирать бургер');
    });
});

export {}