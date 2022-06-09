import React from "react";
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Index from "./index";
import Step1 from "./StepComplete-01";
import Step2 from "./StepComplete-02";
import Step3 from "./StepComplete-03";
import Step4 from "./StepComplete-04";
import Step5 from "./StepComplete-05";

// for more information on react router: https://v5.reactrouter.com/web/guides/quick-start

const RouterPage = (props) => {

    return (
        <Router basename={props.pageInfo.basePath}>
            <div>
                <nav>
                    <ul>
                        <Link to="/">index</Link> | {' '}
                        <Link to="/Step1">Step 1</Link> | {' '}
                        <Link to="/Step2">Step 2</Link> | {' '}
                        <Link to="/Step3">Step 3</Link> | {' '}
                        <Link to="/Step4">Step 4</Link> | {' '}
                        <Link to="/Step5">Step 5</Link>
                    </ul>
                </nav>
            </div>
            <Switch>
                <Route exact path="/">
                    <Index {...props} />
                </Route>
                <Route path="/Step1">
                    <Step1 {...props} />
                </Route>
                <Route path="/Step2">
                    <Step2 {...props} />
                </Route>
                <Route path="/Step3">
                    <Step3 {...props} />
                </Route>
                <Route path="/Step4">
                    <Step4 {...props} />
                </Route>
                <Route path="/Step5">
                    <Step5 {...props} />
                </Route>
            </Switch>
        </Router>
    );
};

RouterPage.propTypes = {
    pageInfo: PropTypes.object
};

export default RouterPage;