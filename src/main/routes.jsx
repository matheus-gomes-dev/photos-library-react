import React from 'react'
import { Router, Route, Redirect, hashHistory } from 'react-router'

import Home from '../home/home'
import Album from '../album/album'

export default props => (
    <Router history={hashHistory}>
        <Route path='/' component={Home} />
        <Route path='/album' component={Album} />
        {/*redirecionamento de urls invalidas*/}
        <Redirect from='*' to='/' /> 
    </Router>
)