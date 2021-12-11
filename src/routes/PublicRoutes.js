import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SLUGS from 'resources/slugs';
import LoadingComponent from 'components/loading';

const SignInComponent = lazy(() => import('./signin'));
const SignUpComponent = lazy(() => import('./signup'));

function PublicRoutes() {
    return (
        <Suspense fallback={<LoadingComponent loading />}>
        <div className="auth-wrapper" style={{marginTop: '30px'}}>
        <div className="auth-inner">
        <Switch>
            <Route path={SLUGS.login} component={SignInComponent} />
            <Route path={SLUGS.signup} component={SignUpComponent} />
            <Route path={SLUGS.forgotPassword} render={() => <div>forgotPassword</div>} />
            <Redirect to={SLUGS.login} />
        </Switch>
        </div></div>
        </Suspense>
    );
}

export default PublicRoutes;
