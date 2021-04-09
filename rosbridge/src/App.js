import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Layout from './Components/Layout';
import AdminPage from './Pages/AdminPage';

function App() {
  return (
    <div className="App">
       <Router>
        <Layout>
          <Switch>
            <Route exact path="/"/>
            <Route path="/admin" component={AdminPage}/>
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
