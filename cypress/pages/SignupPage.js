class SignupPage{

    go() {
        //cy.viewport(1440, 900) Foi colocado no cypress.json
       cy.visit('/');
        
        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    }

    fillForm(deliver) {
                //Dados
                cy.get('input[name="fullName"]').type(deliver.name)
                cy.get('input[name="cpf"]').type(deliver.cpf)
                cy.get('input[name="email"]').type(deliver.email)
                cy.get('input[name="whatsapp"]').type(deliver.cellphone)
        
                //Endereço
                cy.get('input[name="postalcode"]').type(deliver.address.postalcode)
                cy.get('input[value="Buscar CEP"][type="button"]').click()
        
                cy.get('input[name="address-number"]').type(deliver.address.number)
                cy.get('input[name="address-details"]').type(deliver.address.details)
        
                cy.get('input[name="address"]').should('have.value', deliver.address.street)
                cy.get('input[name="district"]').should('have.value', deliver.address.district)
                cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_uf)
        
                //Método de entrega
                cy.contains('.delivery-method li', deliver.delivery_method).click()//Contains seleciona elemento que contpem o valor correspondente 
        
                cy.get('input[type=file][accept^="image"]').attachFile('/images/' + deliver.cnh) //attachFile ria buscar arquivo para fazer upload na pasta fixtures o '/images/' serve para especificar a pasta em que está a imagem

    }

    Submit() {
        cy.get('form button[type=submit]').click()
    }

    modalContentShouldBe(expectedMessage) {
        cy.get('.swal2-container .swal2-html-container')
            .should('have.text', expectedMessage);
    }

    alertMessageShouldBe(expectedMessage) {
        //cy.get('.alert-error').should('have.text', expectedMessage) 
        //Não busca mais de um get para comparação gera um erro de ambiguidade

        cy.contains('.alert-error', expectedMessage).should('be.visible')
        //Solução, busca múltiplas class e compara, constains = contém

    }
}

export default new SignupPage;