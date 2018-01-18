import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import cors from 'cors';
// const express = require('express');
// const gql = require('graphql');
// const graphqlHTTP = require('express-graphql');
// const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
// const cors = require('cors');

const port = process.env.PORT || 8080;

const app = express();

const COURSES = require('./data/courses');

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

const typeDefs = `
    type CourseType {
        id: ID!
        name: String
        description: String
        level: String
    }

    input CourseInput {
        id: ID
        name: String!
        description: String!
        level: String
    }

    type Query {
        allCourses: [CourseType]
    }

    type Mutation {
        createCourse(input: CourseInput): CourseType
        deleteCourse(id: ID): CourseType
    }
`;

const resolvers = {
    Query: {
        allCourses: () => {
            return COURSES;
        }
    },
    Mutation: {
        createCourse: (_, { input }) => {
            let { id, name, description, level } = input;
            COURSES.push({
                id,
                name,
                description,
                level
            });
            return input;
        },
        deleteCourse: (_, { id }) => {
            const courseIndex = COURSES.findIndex(course => {
                return course.id == parseInt(id, 10);
            });
            if (~courseIndex) {
                const foundCourse = COURSES[courseIndex];
                COURSES.splice(courseIndex, 1);
                return foundCourse;
            }
            return null;
        }
    }
};


const schema = makeExecutableSchema({ typeDefs, resolvers});
app.use(cors());
app.use('/graphql', 
        bodyParser.json(),
        graphqlExpress({
            schema,
            tracing: false
        }));
app.use('/graphiql',
        graphiqlExpress({
            endpointURL: '/graphql'
        }));

app.listen(port);
