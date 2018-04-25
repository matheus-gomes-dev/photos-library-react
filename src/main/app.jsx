import 'modules/bootstrap/dist/css/bootstrap.min.css'
import 'modules/font-awesome/css/font-awesome.min.css'

import React from 'react'
import Header from '../header/header'
import Routes from './routes'

export default props => (
    <div className='container'>
    	<Header/>
    	<Routes/>
    </div>
)