describe('Test the seeding input page', () => {


    context('Cache tests', () => {
       
        beforeEach(() => {
            cy.login('manager1', 'farmdata2')
  
  
             
            cy.restoreLocalStorage() 
            cy.visit('/farm/fd2-field-kit/seedingInput')
  
            // Waits for page to be fully loaded
            cy.get('[data-cy=page-loaded]').should('exist')
            
        }) 
        
        afterEach(() => {
  
            cy.saveLocalStorage()
        })
  
  
        it('should have the correct Data section header', () => {
            // Check that the Data section has the header "Data"
            cy.get('fieldset legend')
              .first()
              .should('have.text', 'Data')
              .and('be.visible')
          })
  
          it('should have date input enabled with current date as default', () => {
            // Check that the date selection component is enabled
            cy.get('[data-cy=date-selection]')
              .should('be.visible')
              .and('not.be.disabled')
  
               // Check that it contains today's date
            const today = new Date()
            const formattedDate = today.toISOString().split('T')[0] // Format: YYYY-MM-DD
    
            cy.get('[data-cy=date-selection]')
                .find('input')
                .should('have.value', formattedDate)
            })
  
  
            it('should have crop dropdown enabled with no default selection', () => {
                // Check that the crop dropdown is enabled
                cy.get('[data-cy=crop-selection]')
                  .should('be.visible')
                  .and('not.be.disabled')
  
                cy.get('[data-cy=crop-selection]')
                    .find('select')
                    .should('have.value', null)
  
            })
  
  
  
            // it('should have crop down contain the correct crop list', () => {
            //   // Check that the crop list selection has ARUGULA
            //   cy.get('[data-cy=crop-selection]')
            //     .find('select')
            //     .should('have.value', "ARUGULA")
            // })
  
  
            it('should have crop dropdown contain the correct crop list v2', () => {
              // Check that ARUGULA exists in crop list
              cy.get('[data-cy=crop-selection]')
                .find('select option')
                .then(options => {
                  const values = [...options].map(o => o.value);
                  expect(values).to.include('ARUGULA');
                });
            });
  
    })}
  
  )
  