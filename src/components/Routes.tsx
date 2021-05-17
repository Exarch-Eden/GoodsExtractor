// third-party libraries
import React from 'react'
import { Route, Switch } from 'react-router-dom'

// components
import Home from '../screens/Home'
import About from '../screens/About'
import Search from '../screens/Search'
import IndividualTitle from '../screens/IndividualTitle'

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
      <Route exact path="/search">
        <Search />
      </Route>
      <Route exact path="/title/:id">
        <IndividualTitle />
      </Route>
    </Switch>
  )
}

export default Routes
