'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _apolloServerExpress = require('apollo-server-express');

var _graphqlTools = require('graphql-tools');

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const express = require('express');
// const gql = require('graphql');
// const graphqlHTTP = require('express-graphql');
// const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
// const cors = require('cors');

var port = process.env.PORT || 8080;

var app = (0, _express2.default)();

var COURSES = require('./data/courses');

// const schema = new gql.GraphQLSchema({
//     query: new gql.GraphQLObjectType({
//         name: 'Root',
//         fields: {
//             message: {
//                 type: gql.GraphQLString,
//                 resolve() {
//                     return 'Hello World';
//                 }
//             }
//         }
//     })
// });

var typeDefs = '\n    type CourseType {\n        id: ID!\n        name: String\n        description: String\n        level: String\n    }\n\n    input CourseInput {\n        id: ID\n        name: String!\n        description: String!\n        level: String\n    }\n\n    type Query {\n        allCourses: [CourseType]\n    }\n\n    type Mutation {\n        createCourse(input: CourseInput): CourseType\n        deleteCourse(id: ID): CourseType\n    }\n';

var resolvers = {
    Query: {
        allCourses: function allCourses() {
            return COURSES;
        }
    },
    Mutation: {
        createCourse: function createCourse(_, _ref) {
            var input = _ref.input;
            var id = input.id,
                name = input.name,
                description = input.description,
                level = input.level;

            COURSES.push({
                id: id,
                name: name,
                description: description,
                level: level
            });
            return input;
        },
        deleteCourse: function deleteCourse(_, _ref2) {
            var id = _ref2.id;

            var courseIndex = COURSES.findIndex(function (course) {
                return course.id == parseInt(id, 10);
            });
            if (~courseIndex) {
                var foundCourse = COURSES[courseIndex];
                COURSES.splice(courseIndex, 1);
                return foundCourse;
            }
            return null;
        }
    }
};

var schema = (0, _graphqlTools.makeExecutableSchema)({ typeDefs: typeDefs, resolvers: resolvers });
app.use((0, _cors2.default)());
app.use('/graphql', _bodyParser2.default.json(), (0, _apolloServerExpress.graphqlExpress)({
    schema: schema,
    tracing: false
}));
app.use('/graphiql', (0, _apolloServerExpress.graphiqlExpress)({
    endpointURL: '/graphql'
}));

app.listen(port);