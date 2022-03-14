import signup from '../pages/SignupPage'
import signupFactory from '../factories/signupFactory'
import SignupPage from '../pages/SignupPage';

//expressão regular para encontrar componentes '^'


describe('Signup', () => {

    /*
        before(function(){
            cy.log('Tudo aqui é executado uma única vez ANTES de TODOS casos de teste')
        })  
    
        beforeEach(function(){
            cy.log('Tudo aqui é executado sempre ANTES de CADA caso de teste')
        })
    
        after(function(){
            cy.log('Tudo aqui é executado uma única vez DEPOIS de TODOS casos de teste')
        })
    
        afterEach(function(){
            cy.log('Tudo aqui é executado sempre DEPOIS de cada caso de teste.')
        })
    */
    /*
      beforeEach(function () { 
          cy.fixture('deliver.json').then((d) => { Foi trocado pelo codigo da linha 35, evitando redundância na massa de este da pasta fixtures/deliver.json
              this.deliver = d
          })
      })
  */
    it('User should be deliver', function () {

        let deliver = signupFactory.deliver()

        signup.go()
        signup.fillForm(deliver)
        signup.Submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)


    });

    it('Incorrect document', function () {

        let deliver = signupFactory.deliver()

        deliver.cpf = '0000000001251kjj'

        signup.go()
        signup.fillForm(deliver)
        signup.Submit()

        //const expectedMessage = 
        signup.alertMessageShouldBe('Oops! CPF inválido')

    })

    it('Incorrect email', function () {

        let deliver = signupFactory.deliver()

        deliver.email = 'erick.com.br'

        signup.go()
        signup.fillForm(deliver)
        signup.Submit()

        //const expectedMessage = 
        signup.alertMessageShouldBe('Oops! Email com formato inválido.')

    })

    context('Required fields', function () {
        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivety_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }

        ]
        before(function(){
            signup.go()
            signup.Submit()

        })
        messages.forEach(function(msg){
            it(`${msg.field} is required`, function(){
                signup.alertMessageShouldBe(msg.output)
            })
        })
    })
/*
    it.only('Require fields', function () {

        let deliver = signupFactory.deliver()

        signup.go()
        signup.Submit()
        signup.alertMessageShouldBe('É necessário informar o nome')
        signup.alertMessageShouldBe('É necessário informar o CPF')
        signup.alertMessageShouldBe('É necessário informar o email')
        signup.alertMessageShouldBe('É necessário informar o CEP')
        signup.alertMessageShouldBe('É necessário informar o número do endereço')
        signup.alertMessageShouldBe('Selecione o método de entrega')
        signup.alertMessageShouldBe('Adicione uma foto da sua CNH')
*/


})



