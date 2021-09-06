import logo from './logo.svg';
import './App.css';
import {
  Switch,
  Route,

  useHistory
} from "react-router-dom"

import { useEffect } from 'react';
import ChatPage from './components/ChatPage/ChatPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';

import firebase from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/actions/user_action';

function App() {

  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.user.isLoading);


  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      // user가 있으면 로그인이 된 상태
      // history 객체가 없는 상태
      // push, go, replace같은거를 사용할 수 있는데 없어서 못가고 있다.
      if (user) {
        history.push("/");
        dispatch(setUser(user));
      } else {
        history.push("/login")
      }
      console.log('user', user);
    })
  }, [history])

  if (isLoading) {
    return (
      <div>...loading</div>
    )
  } else {
    return (
      <Switch>
        <Route exact path="/" component={ChatPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
      </Switch>
    );
  }
}

export default App;
