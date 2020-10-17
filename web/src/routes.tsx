import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Landing from './pages/Landing';
import OrphaMap from './pages/OrphaMap'
function Routes () {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Landing} exact/>
                <Route path="/orphanages" component={OrphaMap} />
            </Switch>
        </BrowserRouter>
    );
}
export default Routes;