(function () {
    
      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyAgYaIluj96OUC6Rd_3bXNPhRMeIKkQn3o",
        authDomain: "webdev-firebase-10969.firebaseapp.com",
        databaseURL: "https://webdev-firebase-10969.firebaseio.com",
        projectId: "webdev-firebase-10969",
        storageBucket: "webdev-firebase-10969.appspot.com",
        messagingSenderId: "63984711583"
      };
      firebase.initializeApp(config);
      
      const emailInput = document.getElementById('email_text');
      const passInput = document.getElementById('pass_text');
      const loginBtn = document.getElementById('login_button');
      const signupBtn = document.getElementById('signup_button');
      const logoutBtn = document.getElementById('logout_button');
      var mainUser = null;
      const scoreContainer = document.getElementById('score_value');
      const clickMeBtn = document.getElementById('clickme_button');
      
      
      //Login
      loginBtn.addEventListener('click', e=> {
          //Get email and password
          const email = emailInput.value;
          const password = passInput.value;
          const auth = firebase.auth();
          
          //Sign in
          const result = auth.signInWithEmailAndPassword(email, password);
          result.catch(e=>console.log(e.message));
      });
      
      //Signup
      signupBtn.addEventListener('click', e=> {
          //Get email and password
          const email = emailInput.value;
          const password = passInput.value;
          const auth = firebase.auth();
          
          //Sign up
          const result = auth.createUserWithEmailAndPassword(email, password);
          result
          .then(user => {
              console.log(user);
              var db = firebase.database();
              
              db.ref('users/' + user.user.uid).set({score: 0});
          })
          .catch(e=>console.log(e.message));
      });
      
      //Logout
      logoutBtn.addEventListener('click', e=> {
          firebase.auth().signOut();
      });
      
      //Click me!
      clickMeBtn.addEventListener('click', e => {
            //Get score
         firebase.database().ref('users/' + mainUser.uid).once('value').then(function(snapshot) {
             var score = (snapshot.val() && snapshot.val().score) || 0;
             score += 1;
             firebase.database().ref('users/' + mainUser.uid).set({score});
             scoreContainer.innerHTML = score;
         });
      });
      
      firebase.auth().onAuthStateChanged(user => {
         if (user) {
             mainUser = user;
             
             //Hide login form
             logoutBtn.style.display = 'inline';
             loginBtn.style.display = 'none';
             signupBtn.style.display = 'none';
             emailInput.style.display = 'none';
             passInput.style.display = 'none';
             
             //Show score counter
             document.getElementById('click_container').style.display = 'block';
             document.getElementById('welcome_container').style.display = 'inline';
             document.getElementById('welcome_value').innerHTML = user.email;
             
             //Get score
             var score;
             console.log('another log', user);
             firebase.database().ref('users/' + user.uid).once('value').then(function(snapshot) {
                 score = (snapshot.val() && snapshot.val().score) || 0;
                 console.log("found score", score);
                 scoreContainer.innerHTML = score;
             });
             
         } else {
             console.log('not logged in');
             
             //Show login form
             logoutBtn.style.display = 'none';
             loginBtn.style.display = 'inline';
             signupBtn.style.display = 'inline';
             emailInput.style.display = 'block';
             passInput.style.display = 'block';
             
             //clear text
             // TODO 
             
             
             //Hide score counter
             document.getElementById('click_container').style.display = 'none';
             document.getElementById('welcome_container').style.display = 'none';
         }
      });
}());