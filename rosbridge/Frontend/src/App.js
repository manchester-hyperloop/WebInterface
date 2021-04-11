import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Layout from './Components/Layout';
import AdminPage from './Pages/AdminPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import PrivateRoute from './Routes/PrivateRoute';
import AdminRoute from './Routes/AdminRoute';

function App() {
  return (
    <div className="App">
       <Router>
        <Layout>
          <Switch>
            <Route exact path="/"/>
            <Route exact path="/login" component={LoginPage}/>
            <Route exact path="/register" component={RegisterPage}/>
            <AdminRoute path="/admin" component={AdminPage}/>
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
