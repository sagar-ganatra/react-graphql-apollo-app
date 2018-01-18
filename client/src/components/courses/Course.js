import React, { Component } from 'react';

class Course extends Component {
    render() {
        const { course } = this.props;
        return (
            <div>
                {course.name}  {course.description}
            </div>
        );
    }
}

export default Course;