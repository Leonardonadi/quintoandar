describe('Busca de imóveis', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', (error) => {
      if (
        error.message.includes('Script error.') ||
        /Minified React error #(418|423)/.test(error.message)
      ) {
        return false
      }
    })
  })

  it('permite buscar por Rio de Janeiro', () => {
    cy.visit('/comprar/imovel/rio-de-janeiro-rj-brasil')

    cy.get('input[name="cockpit-location-input"]')
      .should('be.visible')
      .clear()
      .type('Rio de Janeiro')
      .should('have.value', 'Rio de Janeiro')
  })

  it('abre um imóvel encontrado na Estrada do Engenho D Água', () => {
    cy.visit('/comprar/imovel/rio-de-janeiro-rj-brasil')

    cy.get('input[name="cockpit-location-input"]')
      .should('be.visible')
      .clear()
      .type('Estrada do engenho d agua')

    cy.get('[role="option"]')
      .contains(/Estrada do Engenho D'Água/)
      .click()

    cy.location('pathname').should(
      'include',
      'estr.-do-engenho-dagua-anil-rio-de-janeiro-rj-brasil',
    )

    cy.contains('a[href^="/imovel/"]', /Estrada do Engenho/i)
      .should('be.visible')
      .invoke('removeAttr', 'target')
      .click()

    cy.location('pathname').should('match', /\/imovel\/\d+\//)
    cy.get('h1')
      .should('be.visible')
      .invoke('text')
      .should('match', /Apartamento à venda com [1-9]\d*m², [1-9]\d* quartos/)
  })
})
