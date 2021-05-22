import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from '../../firebaseConfig';
import { useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee,faGoogle } from '@fortawesome/free-solid-svg-icons';

import './Login.css';
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}


function Login() {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    const [newUser,setNewUser] = useState(false);
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    const [user, setUsers] = useState({
      isSignedIn : false,
      name : '',
      email: '',
      password: '',
      photo: '',
      error: ''
    });
  
  
    const handleGoogleSignIn = () =>{
      console.log('sign in clicked');
  
  
      firebase.auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        var user = result.user;
        const {displayName, photoURL, email} = user;
  
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
  
        setUsers(signedInUser);
        console.log(displayName, photoURL, email);

        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode,errorMessage,email,credential);
     });
    }
  

    const handleFbSignIn = () =>{
        firebase
        .auth()
        .signInWithPopup(facebookProvider)
        .then((result) => {
            var user = result.user;
            const {displayName, photoURL, email} = user;
    
            const signedInUser = {
            isSignedIn: true,
            name: displayName,
            email: email,
            photo: photoURL
            }
    
            setUsers(signedInUser);
            console.log(displayName, photoURL, email);
            setLoggedInUser(signedInUser);
            history.replace(from);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log(errorCode,errorMessage,email,credential);
        });
    }
  
    const handleBlur = (e) =>{
      const values = e.target.value;
      const name = e.target.name;
      console.log(name, values);
  
  
      const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      let isFieldValid = true;
      if(name === 'email'){
        const isFieldValid = regexEmail.test(values);
        console.log(isFieldValid);
      }
  
      if(name === 'password'){
        const isFieldValid = values.length> 6 && /[0-9]/.test(values);
        console.log(isFieldValid);
      }
  
      if (isFieldValid) {
        const newUserInfo = {...user};
        console.log(newUserInfo);
        newUserInfo[e.target.name] = e.target.value;
        setUsers(newUserInfo);
        setLoggedInUser(newUserInfo);
      }
    }
  
    const handleSubmit = (e) => {
      console.log(user.email, user.password);
      if(newUser && user.email && user.password){
        console.log('submitting');
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
  
        .then(res =>{
          const newUserInfo = {...user};
          newUserInfo.error ='';
          newUserInfo.success = true;
          setUsers(newUserInfo);
          console.log(res);
          updateUserName(user.name);

          setLoggedInUser(newUserInfo);
          history.replace(from);
         
        })
        .catch((error) => {
  
          const userNewInfo = {...user};
          userNewInfo.error = error.message;
          userNewInfo.success = false;
          setUsers(userNewInfo);
          setLoggedInUser(userNewInfo);
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
          
        });
      }
  
      if (!newUser && user.email && user.password) {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res =>{
          const newUserInfo = {...user};
          newUserInfo.error ='';
          newUserInfo.success = true;
          setUsers(newUserInfo);
          console.log(res.user);

          setLoggedInUser(newUserInfo);
          history.replace(from);
        })
        .catch((error) => {
  
          const userNewInfo = {...user};
          userNewInfo.error = error.message;
          userNewInfo.success = false;
          setUsers(userNewInfo);
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
          setLoggedInUser(userNewInfo);
        });
      }
  
      e.preventDefault();
    }
  
    const updateUserName = (name) =>{
      const user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: name,
      
      }).then(function() {
        console.log('Update successful.');
      }).catch(function(error) {
        console.log(error);
      });
    }
  
    return (
      <div className="App">
        
      {/* <p>User Name : {user.name}</p>
      <p>User Email : {user.email}</p>
      <p>User Password : {user.password}</p>
        <p>Name: {loggedInUser.name}</p> */}
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">

                    {/* <input type="checkbox" name="newUser" onChange={()=> setNewUser(!newUser)} id=""/>
                    <label htmlFor="newUser">New User Sign Up</label>            */}
                        
                    <form action="" onSubmit={handleSubmit}>
                        <h4 className="text-left pb-4">{newUser ? 'Create an account' : 'Login'}</h4>
                        
                        {newUser && <input type="text" name="name" onBlur={handleBlur} className="form-control" placeholder="Enter your name" id=""/>}
                        <br/>

                        <input type="text" name="email"  onBlur={handleBlur} className="form-control" required placeholder="Enter your email address"/>
                        <br/>
                        
                        <input type="password" name="password" onBlur={handleBlur} className="form-control" required placeholder="Enter your password" id=""/>
                        <br/>
                        
                        {newUser && <input type="password" name="password" onBlur={handleBlur} className="form-control" required placeholder="Confirm your password" id=""/>}
                        <br/>

                        <button type="submit" className="form-control btn-danger">{newUser ? 'Create an account' : 'Login'}</button><br/>
                        <p>Don't have an account? <a href="#" name="newUser" className="text-danger mt-1" onClick={()=> setNewUser(!newUser)}>Create an account</a></p>
                    </form>
                </div>
            </div>
        </div>
        <h3>Or</h3>
        <button className="btn btn-primary" onClick ={handleGoogleSignIn}>Continue With Google</button><br/>
        <button className="btn btn-primary mt-2" onClick ={handleFbSignIn}>Continue With Facebook</button><br/>
        <p style={{color: 'red'}}>{user.error}</p>
        {
          user.success &&  <p style={{color: 'green'}}>User {newUser ? 'created' : 'logged'} In successfully</p>
        }
      </div>
    );
  }
  
  export default Login;