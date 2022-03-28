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
    useParams
} from "react-router-dom";

import {
    allDepartments,
    allCourses,
    availableCourses
} from "../utils/courses"

const styles = {
    cardsGrid: {
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

// for the first step, you'll be focus on creating the filter bar at the top of your page for this step
// you're provided a static list of courses with information under utils/courses
// we're going to setup a skeleton router, that will be used as a boiler plate for the end result

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

const PageWrapper = (props) => {
    return (
        <Router basename={encodeURI(props.pageInfo.basePath)}>
            <CoursePicker />
        </Router>
    );
};

PageWrapper.propTypes = {
    pageInfo: PropTypes.object.isRequired
};

export default withStyles(styles)(PageWrapper);