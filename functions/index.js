const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello Robert");
});

const createNotification = (notification => {
  return admin.firestore().collection('notifications').add(notification)
  .then(doc => console.log('notification added'), doc);
});

exports.projectCreated = functions.firestore.document('projects/{projectsId}').onCreate(doc =>{
  const project = doc.data();
  const notification = {
    content: 'Added New Project',
    user: `${project.authorFirstName} ${project.authorLastName}`,
    time: admin.firestore.FieldValue.serverTimestamp()
  };
  return createNotification(notification);
});

exports.userJoined = functions.auth.user()
  .onCreate(user => admin.firestore().collection('users')
    .doc(user.uid).get()
    .then((doc) => {
      const newUser = doc.data();
      const notification = {
        content: 'Joined the party',
        user: `${newUser.firstName} ${newUser.lastName}`,
        time: admin.firestore.FieldValue.serverTimestamp(),
      };

      return createNotification(notification);
    }));

/*
exports.userJoined = functions.firestore.document("users/{uid}")
 .onCreate(doc => {
  const user = doc.data();
  const notification = {
   content: "Joined the party",
   user: `${user.firstName} ${user.lastName}`,
   time: admin.firestore.FieldValue.serverTimestamp()
  };
  return createNotification(notification);
});
*/