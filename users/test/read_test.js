const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
    let joe, mary, alex, zach;

    beforeEach((done) => {
        alex = new User({ name: 'Alex' });
        joe = new User({ name: 'Joe' });
        mary = new User({ name: 'Mary' });
        zach = new User({ name: 'Zach' });

        Promise.all([alex, joe, mary, zach].map(user => user.save()))
            .then(() => done());

        
    });
    
    it('finds all users with a name of joe', (done) => {
        User.find({ name: 'Joe' })
            .then((users) => {
                assert(users[0]._id,toString() === joe._id.toString());
                done();
            });
    });

    it('finds a users with a particular id', (done) => {
            User.findOne({ _id: joe._id })
            .then((user) => {
                assert(user.name === 'Joe');
                done();
            });
    });

    it('can skip and limit the result set', (done) => {
        User.find({})
        .sort({ name: 1 })
        .skip(1)
        .limit(2)
        .then((users) => {
            assert(users.length === 2);
            assert(users[0].name === 'Joe');
            assert(users[1].name === 'Mary');
            done();
        })
    });
});
