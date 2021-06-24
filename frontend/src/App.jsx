import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import StartPage from './pages/StartPage'
import IdentityPage from './pages/IdentityPage'
import NotesPage from './pages/NotesPage'

import './styles/common.scss'

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={StartPage} />
        <Route path="/notes/:name" exact component={NotesPage}/>
        <Route path="/identity" exact component={IdentityPage}/>
      </Switch>
    </Router>
  );
}

export default App;
