let googleUser;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      googleUser = user;
      getNotes(googleUser.uid);
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const getNotes = (userID) => {
    console.log("logged in as user: " + userID);
    // 1. Get access to all the current user's notes
    const dbref = firebase.database().ref(`users/${userID}`)
    dbref.on('value', (snapshot) => {
        document.querySelector("#app").innerHTML = "";
        renderData(snapshot.val());
    });
    // 2. Display them on the page

};

const renderData = (data) => {
    const destination = document.querySelector("#app");
    for (let key in data) {
        const note = data[key];
        destination.innerHTML += createCard(note);
    }
};

const createCard = (note) => {
    return `<div class = "column is one-quarter">
                <div class = "card"> 
                    <div class = "card-header"> 
                        <p class = "card-header-title"> ${note.title} </p>
                    </div>
                    <div class = "card-content">
                        <div class = "cotent">
                            ${note.text}
                        </div>
                    </div>
                </div> 
            </div>`;
};