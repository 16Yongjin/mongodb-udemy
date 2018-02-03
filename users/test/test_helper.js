const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // ES6 Promie 사용하기

before(() => {
    mongoose.connect('mongodb://localhost/users_test', { useMongoClient: true });
    mongoose.connection
        .once('open', () => {})
        .on('error', (error) => console.warn('Warning', error));
});


beforeEach((done) => {
    const { users, comments, blogposts } = mongoose.connection.collections;

    users.drop(() => {
        comments.drop(() => {
            blogposts.drop(() => {
                done();
            })
        })    
    });
    // Promise.all([users.drop(), comments.drop(), blogposts.drop()])
    //     .then(() => done());
});