// third-party libraries
import React from 'react'
import { Route, Switch } from 'react-router-dom'

// components
import Home from '../screens/Home'
import About from '../screens/About'


// css


const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/about">
        <About />
      </Route>
    </Switch>
  )
}

export default Routes
