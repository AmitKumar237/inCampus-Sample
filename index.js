// Your web app's Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyDgARm9V-WGS6DOU61cVsC4AwzfuWtPUeI",
    authDomain: "incampus-c44df.firebaseapp.com",
    databaseURL: "https://incampus-c44df-default-rtdb.firebaseio.com",
    projectId: "incampus-c44df",
    storageBucket: "incampus-c44df.appspot.com",
    messagingSenderId: "364799673773",
    appId: "1:364799673773:web:15440e6a0ec583e3258d24"

  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()
  

  // Set up our register function
  function register () {
    // Get all our input fields
    email = document.getElementById('email').value
    reg_no = document.getElementById('reg_no').value
    password = document.getElementById('password').value
    full_name = document.getElementById('full_name').value
    college_name = document.getElementById('college_name').value
    passwordc = document.getElementById('passwordc').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password,passwordc) == false) {
      alert('Email or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
    if (validate_field(full_name) == false || validate_field(college_name) == false || validate_field(reg_no) == false) {
      alert('One or More Extra Fields is Outta Line!!')
      return
    }
   alert(reg_no)
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        reg_no : reg_no,
        email : email,
        full_name : full_name,
        college_name : college_name,
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)
  
      // DOne
      alert('User Created!! You can login now.')
      window.location = 'login.html'

    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  // Set up our login function
  function login () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password,password) == false) {
      alert('Email or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)
  
      // DOne
      alert('User Logged In!!')
  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  
  
  
  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password,passwordc){
    if(password != passwordc){
          return false
    }
    
    if(password < 6){
      return false
    }
    else{
        return true
    }
}
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }
