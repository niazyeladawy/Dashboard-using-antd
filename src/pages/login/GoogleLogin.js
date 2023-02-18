import React, { useContext } from 'react';
import 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../components/firebase';
import { Navigate } from 'react-router-dom';
import routerLinks from '../../components/routerLinks';
import AuthContext from '../../context/auth/AuthContext';
import UserContext from '../../context/auth/UserProvider';
import { FcGoogle } from 'react-icons/fc';


const GoogleLogin = () => {

  const { login } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);
  const signInWithGoogle = async () => {

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser(user)
        login()
        Navigate(routerLinks.homePage)
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <button
      onClick={signInWithGoogle}
      className="mt-3"
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        color: '#4285F4',
        padding: '8px 16px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      <FcGoogle className='me-2'/>
      Sign in with Google
    </button>
  );
};

export default GoogleLogin;
