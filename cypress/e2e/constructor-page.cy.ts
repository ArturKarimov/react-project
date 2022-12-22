describe('service is available', function() {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    })

    const dropTarget = '[data-testid="drop-target"]';
    const bun = '[data-testid="ingredient-60d3b41abdacab0026a733c7"]';
    const sauce = '[data-testid="ingredient-60d3b41abdacab0026a733cd"]';
    const draggableSauce = '[data-testid="draggableitem-60d3b41abdacab0026a733cd"]';

    it('should be available on localhost:3000', function() {
        cy.visit('http://localhost:3000');
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
        const modalPopupSelector = '[data-testid="modal-content"]';
        cy.get(modalPopupSelector).contains('Ваш заказ начали готовить');
        cy.get(modalPopupSelector).find("svg").first().click();
    })

    it("should be constructor is empty", () => {
        cy.get(dropTarget).contains('Начни собирать бургер');
    });
});

export {}