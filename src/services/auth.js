import auth from '@react-native-firebase/auth';

const signUp = (fullname, email, password) => {
  if (!fullname || !email || !password) {
    alert('enter data');
  } else {
    return auth()
      .createUserWithEmailAndPassword(email.trim(), password)
      .then(cred => {
        auth().currentUser.updateProfile({
          displayName: fullname,
        });
        return uid;
      })
      .catch(err => alert(err.code, err.message));
  }
};

const signIn = (email, password) => {
  if (!email || !password) {
    alert('enter details');
  } else {
    return auth()
      .signInWithEmailAndPassword(email.trim(), password)
      .then(() => {
        console.log('logged in ');
        console.log(auth().currentUser.uid);
      })
      .catch(err => alert(err.code, err.message));
  }
};

const signOut = () => {
  return auth().signOut();
};

const Auth = {
  signUp,
  signIn,
  signOut,
};

export default Auth;
