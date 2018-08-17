import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'


import App from '../layouts/app'
import PortalIndex from '../layouts/portal/index'
import ConfigIndex from '../layouts/config/index'

import Scenes from '../layouts/scenes/index'

// import ReleaseIndex from '../layouts/release/index'

// import Scenes2DGrid from '../layouts/scenes/2dGrid'
// import Scenes2DFlow from '../layouts/scenes/2dFlow'
// import Scenes2DFree from '../layouts/scenes/2dFree'

export default function(history) {
  return (
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={Scenes} />
        <Route path='/portal' component={PortalIndex} ></Route>
        <Route path='/config' component={ConfigIndex} ></Route>


      {
        // <Route path='/scenes2dGrid' component={Scenes2DGrid} ></Route>
        // <Route path='/scenes2dFlow' component={Scenes2DFlow} ></Route>
        // <Route path='/scenes2dFree' component={Scenes2DFree} ></Route>
        //  <Route path='/release' component={ReleaseIndex} ></Route>
      }
      </Route>
    </Router>
  )
}
