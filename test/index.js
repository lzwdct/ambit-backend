var filter = require('../index').filter;

const ALL_RESULT = [{"name":"Jim","age":30,"gender":"male","_id":"b3Fshn8F976TZCTg"},{"name":"Jane","age":55,"gender":"female","_id":"k3nEqkqlKmWZNejC"}];
const AGE_OVER_30 = [{"name":"Jim","age":30,"gender":"male","_id":"b3Fshn8F976TZCTg"},{"name":"Jane","age":55,"gender":"female","_id":"k3nEqkqlKmWZNejC"}];
const MALES = [{"name":"Jim","age":30,"gender":"male","_id":"b3Fshn8F976TZCTg"},{"name":"Bob","age":20,"gender":"male","_id":"oqnu2ZnPTebp04bG"}];
const FEMALE = [{"name":"Jane","age":55,"gender":"female","_id":"k3nEqkqlKmWZNejC"},{"name":"Sally","age":24,"gender":"female","_id":"tKmv8RC6GlUnYcV3"}];
const FEMALE_UNDER_30 = [{"name":"Jane","age":55,"gender":"female","_id":"k3nEqkqlKmWZNejC"}];

describe('Ambit - Test', function() {
    // This is the name of the test
    it('Returns all data', function(done) {
        const result = filter({});
        result.then(data => {
            expect(JSON.stringify(data)).to.equal(JSON.stringify(ALL_RESULT));
        })
        setTimeout(done, 300);
    });

    it('Returns males only', function(done) {
        this.timeout(500);
        const result = filter({
            gender: 'male'
        });
        result.then(data => {
            expect(JSON.stringify(data)).to.equal(JSON.stringify(MALES));
        })
        setTimeout(done, 300);
    });

    it('Returns females only', function(done) {
        this.timeout(500);
        const result = filter({
            gender: 'male'
        });
        result.then(data => {
            expect(JSON.stringify(data)).to.equal(JSON.stringify(FEMALE));
        })
        setTimeout(done, 300);
    });

    it('Returns age over 30', function(done) {
        this.timeout(500);
        const result = filter({
            age: 30,
            over: true
        });
        result.then(data => {
            expect(JSON.stringify(data)).to.equal(JSON.stringify(AGE_OVER_30));
        })
        setTimeout(done, 300);
    });

    it('Returns females age under 30', function(done) {
        this.timeout(500);
        const result = filter({
            age: 30,
            over: false,
            gender: 'female'
        });
        result.then(data => {
            expect(JSON.stringify(data)).to.equal(JSON.stringify(FEMALE_UNDER_30));
        })
        setTimeout(done, 300);
    });
});