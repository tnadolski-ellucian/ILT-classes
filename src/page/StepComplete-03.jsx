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

// Next, build out a router that renders your CoursesGrid on it's default route.
// NOTE: on your router, you'll want to add basename={encodeURI(props.pageInfo.basePath)}
// the output of this should result should show all courses on the main page
// if courses are not displaying, ensure you don't have a stray parameter in the url -- this happens if you've clicked one of the filters before step 4

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
                                to={dept}
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

const PageWrapper = (props) => {

    const { url } = useRouteMatch();

    return (
        <Router basename={`${props.pageInfo.basePath}${url}`}>
            <CoursePicker />
            <Switch>
                <Route exact path="/">
                    <AllCoursesPage {...props} />
                </Route>
            </Switch>
        </Router>
    );
};

CoursesGrid.propTypes = {
    classes: PropTypes.object.isRequired,
    courseInfo: PropTypes.array.isRequired
}

AllCoursesPage.propTypes = {
    classes: PropTypes.object.isRequired
}

PageWrapper.propTypes = {
    classes: PropTypes.object.isRequired,
    pageInfo: PropTypes.object.isRequired,
    cardInfo: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(PageWrapper));