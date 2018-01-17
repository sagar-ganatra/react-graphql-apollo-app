const express = require('express');
const gql = require('graphql');
const graphqlHTTP = require('express-graphql');
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const cors = require('cors');

const port = process.env.PORT || 8080;

const app = express();

const schema = new gql.GraphQLSchema({
    query: new gql.GraphQLObjectType({
        name: 'Root',
        fields: {
            message: {
                type: gql.GraphQLString,
                resolve() {
                    return 'Hello World';
                }
            }
        }
    })
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(port);
