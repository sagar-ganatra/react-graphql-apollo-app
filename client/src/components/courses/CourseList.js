import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Course from './Course';

class CourseList extends Component {
    render() {
        const { allCourses } = this.props.data;
        if (!allCourses) return null;
        console.log(allCourses);
        const coursesHTML = allCourses.map(course => {
            return (
                <Course key={course.id}
                        course={course} />
            );
        });
        return coursesHTML;
    }
}

export default graphql(gql`
    query CourseListQuery {
        allCourses {
            id
            name
            description
        }
    }
`)(CourseList);