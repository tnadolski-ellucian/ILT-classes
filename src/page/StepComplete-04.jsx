/* eslint-disable @calm/react-intl/missing-formatted-message */
import React, { Fragment } from 'react';
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

// Now let's build a page that takes a parameter 'subject' and filters backed on the selection from CoursePicker

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

const AllCoursesPage = (props) => {
    const { classes } = props;
    const courses = allCourses();

    return (
        <div>
            <Typography variant="h2" className={classes.subheader}>
                Available Courses
            </Typography>
            <CoursesGrid courseInfo={courses} classes={classes} />
        </div>
    )
}

const CoursesPage = (props) => {
    const { classes } = props;

    // useParams comes from react-router-dom
    // https://reactrouter.com/web/api/Hooks/useparams
    const { subject } = useParams();

    const selectedSubjectCourses = availableCourses[subject];

    return (
        <div>
            <Typography variant="h2" className={classes.subheader}>
                {subject ? `Availables Courses for: ${subject}` : 'Available Courses'}
            </Typography>
            <CoursesGrid courseInfo={selectedSubjectCourses} classes={classes} />
        </div>
    );
}

const PageWrapper = (props) => {

    const { url } = useRouteMatch();

    return (
        <Fragment>
            <CoursePicker />
            <Switch>
                <Route exact path={url}>
                    <AllCoursesPage {...props} />
                </Route>
                <Route path={`${url}/:subject`}>
                    <CoursesPage {...props} />
                </Route>
            </Switch>
        </Fragment>
    );
};

CoursesGrid.propTypes = {
    classes: PropTypes.object.isRequired,
    courseInfo: PropTypes.array.isRequired
}

AllCoursesPage.propTypes = {
    classes: PropTypes.object.isRequired
}

CoursesPage.propTypes = {
    classes: PropTypes.object.isRequired
}

PageWrapper.propTypes = {
    classes: PropTypes.object.isRequired,
    pageInfo: PropTypes.object.isRequired,
    cardInfo: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(PageWrapper));