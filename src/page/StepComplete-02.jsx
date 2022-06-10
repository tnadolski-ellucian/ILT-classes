/* eslint-disable @calm/react-intl/missing-formatted-message */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing10, spacing40, borderRadiusMedium } from "@ellucian/react-design-system/core/styles/tokens";
import {
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Grid,
    TextLink,
    Typography,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Button,
    Alert
} from "@ellucian/react-design-system/core"

import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
    useParams,
    withRouter,
    useRouteMatch
} from "react-router-dom";

import {
    allDepartments,
    allCourses,
    availableCourses
} from "../utils/courses"

const styles = {
    grid: {
        marginBottom: spacing40
    },
    alert: {
        position: 'fixed',
        top: 0
    },
    cards: {
        height: '15.625rem',
        borderRadius: borderRadiusMedium,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    subheader: {
        marginTop: spacing40,
        marginBottom: spacing40
    },
    button: {
        marginRight: spacing10,
        marginLeft: 'auto',
        display: 'flex'
    }
}

// now that the filter is complete, focus on grabbing all course information and formatting it into a grid
// you'll also need props validation for this component
// NOTE: The output shouldn't change. this step is just to setup the display for the next three.

const CoursesGrid = (props) => {
    const { classes, courseInfo } = props;

    return (
        <Grid container className={classes.grid}>
            {courseInfo && courseInfo.map((course, index) => (
                <Grid item key={`card-${index}`} xs={12} sm={6} lg={3}>
                    <Card padding={'dense'}>
                        <CardHeader title={course.title} subheader={course.course} />
                        <CardContent>
                            <Typography>
                                {course.department}
                            </Typography>
                            <Typography>
                                Start date: {course.start.toDateString()}
                            </Typography>
                            <Typography>
                                End date: {course.end.toDateString()}
                            </Typography>
                            <Typography>
                                {course.start.toLocaleTimeString()} - {course.end.toLocaleTimeString()}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

const CoursePicker = () => {

    const { url } = useRouteMatch();

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary>
                <Typography>
                    Filter by subject
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid container wrap="wrap">
                    {allDepartments().map((dept) => (
                        <Grid item key={`${dept}`}>
                            <TextLink
                                component={Link}
                                to={`${url}/${dept}`}
                            >
                                {dept}
                            </TextLink>
                        </Grid>
                    ))}
                </Grid>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}

const PageWrapper = (props) => {

    const { url } = useRouteMatch();

    return (
        <CoursePicker />
    );
};

PageWrapper.propTypes = {
    pageInfo: PropTypes.object.isRequired
};

CoursesGrid.propTypes = {
    classes: PropTypes.object.isRequired,
    courseInfo: PropTypes.array.isRequired
}

export default withRouter(withStyles(styles)(PageWrapper));