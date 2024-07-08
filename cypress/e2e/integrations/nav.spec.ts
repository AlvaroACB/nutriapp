describe('Navigation test', () => {
    it('Visit', () => {
        cy.visit('http://localhost:8100/');
        cy.get('button').contains('Ingresar').click();
    })
});