import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'


import App from '../layouts/app'
import PortalIndex from '../layouts/portal/index'

export default function(history) {
  return (
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={PortalIndex} />
      </Route>
    </Router>
  )
}
