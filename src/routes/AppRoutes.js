import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SLUGS from 'resources/slugs';
import LoadingComponent from 'components/loading';

const DashboardComponent = lazy(() => import('./dashboard'));
const CollaborateComponent = lazy(() => import('./collaborate'));
const ExpenseComponent = lazy(() => import('./expense'));
const ToDo=lazy(()=> import('./ToDo'));

// const SignInComponent = lazy(() => import('./signin'));
// const SignUpComponent = lazy(() => import('./signup'));

function AppRoutes() {
    return (
        <Suspense fallback={<LoadingComponent loading />}>
            <Switch>
                <Route exact path={SLUGS.dashboard} component={DashboardComponent} />
                <Route exact path={SLUGS.todo} component={ToDo} />
                <Route exact path={SLUGS.expenses} component={ExpenseComponent} />
                <Route exact path={SLUGS.collaborate} component={CollaborateComponent} />
                <Route exact path={SLUGS.settings} render={() => <div>Settings Component</div>} />
                
                <Redirect to={SLUGS.dashboard} />
            </Switch>
            
        </Suspense>
    );
}

export default AppRoutes;
