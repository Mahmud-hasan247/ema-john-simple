import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './FireBase.Config';
import {UserContext} from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: ''
  })
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
    .then(result => {
      const {displayName, email, photoURL} = result.user;
      const showUserInfo = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(showUserInfo);
      console.log(photoURL);
    })
    .catch(error => {
      console.log(error.message);
    })
  }

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleSignOut = () => {
    firebase.auth().signOut()
    .then(res => {
      const hideUserInfo = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
      }
      setUser(hideUserInfo)
    })
    .catch(err => {
      console.log(err);
    })
  }

  const handleBlur = (event) => {
    let isFormValid;
    if(event.target.name === 'email'){
      isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if(event.target.name === 'password'){
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFormValid = isPasswordValid && passwordHasNumber;
    }
    if (event.target.name === 'name') {
      isFormValid = true;
    }
    if(isFormValid) {
      const newUserInfo = {...user}
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }

  const handleForm = () => {

  }

  const handleSubmit = (e) => {
    if(newUser && user.email && user.password){firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        const newUserInfo = {...user}
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        updateUserInfo(user.name)
      })
      .catch(error => {
        const newUserInfo = {...user}
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
    });
    }
    e.preventDefault();

    if(!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const newUserInfo = {...user}
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo);
        history.replace(from);
        console.log('UserInfo', res.user)
      })
      .catch(function(error) {
        const newUserInfo = {...user}
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }
  }

  const updateUserInfo = name => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function() {
      console.log('name is updated')
    }).catch(function(error) {
      console.log(error)
    });
  }

  return (
    <div style={{textAlign: 'center'}}>
      <header className="App-header">
        {user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> :
        <button onClick={handleSignIn}>Sign In</button>
          }
        {
          user.isSignedIn && <div>
            <p>Welcome, {user.name}!</p>
            <small>Your email: {user.email}</small>
            <img src={user.photo} alt=""></img>
          </div> 
        }
        <h1>Our Own Authentication</h1>
        <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} id=""/>
        <label for="newUser">Sign Up</label>
        <form onSubmit={handleForm}>
          
          {newUser && <input name='name' onBlur={handleBlur} placeholder='Your name' type="text"/>}
          <br/>
          <input type="text" name='email' placeholder='Your Email' onBlur={handleBlur} required/>
          <br/>
          <input type="password" name="password" placeholder="Your Password" onBlur={handleBlur} required/>
          <br/>
          <input onClick={handleSubmit} type="submit" value={newUser ? 'Sign up' : 'Sign in'}/>
        </form>
      <p style={{color:'red'}}>{user.error}</p>
      {user.success && <p style={{color:'green'}}>You {newUser ? 'Created account' : 'Logged in'} successfully!</p>}
      </header>
    </div>
  );
}

export default Login;
