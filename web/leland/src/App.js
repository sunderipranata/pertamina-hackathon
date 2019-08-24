import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './routes/Home'
import Detail from './routes/Detail'
import Summary from './routes/Summary'
import Search from './routes/Search'

import { DETAIL_PATH, SUMMARY_PATH, SEARCH_PATH } from './url'

import './App.scss'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path={DETAIL_PATH} component={Detail} />
        <Route exact path={SUMMARY_PATH} component={Summary} />
        <Route exact path={SEARCH_PATH} component={Search} />
      </Switch>
    </Router>
  );
}

export default App;