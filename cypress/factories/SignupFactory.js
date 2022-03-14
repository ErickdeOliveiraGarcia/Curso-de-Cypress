let faker = require('faker')
let cpf = require('gerador-validador-cpf')

export default {
    deliver: function () {

        let firstName = faker.name.firstName()
        let lastName = faker.name.lastName()
        //let email = faker.internet.email(firstName,lastName).toLowerCase()
        

        let data = {
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: faker.internet.email(firstName,lastName).toLowerCase(),
            cellphone: '1199999999',
            address: {
                postalcode: '14409000',
                street: 'Rua Jonas Rodrigues de Moura',
                number: '1020',
                details: 'casa',
                district: 'Jardim Barão',
                city_uf: 'Franca/SP'
            },
            delivery_method: 'Moto',
            cnh: 'cnh-digital.jpg'
        }
        return data
    }
    
}
