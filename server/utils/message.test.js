var expect = require('expect');

var {generateMessage} = require('./message')

describe('generateMessage', () => {
it('should generate the correct message object',() => {

    var from = 'Paulius';
    var text = 'Katu?';
    var res = generateMessage(from,text)

        expect(res.toObject()).toMatchObject({
            from: from,
            text: text
        })
        expect(typeof res.createdAt).tobe('number')
})

})