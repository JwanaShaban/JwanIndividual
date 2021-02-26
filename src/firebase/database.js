import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDgnB_cml_eLCAguipJsJ7Sz5Tht-H9BZo",
  authDomain: "cardiomyopathy.firebaseapp.com",
  projectId: "cardiomyopathy",
  storageBucket: "cardiomyopathy.appspot.com",
  messagingSenderId: "417026728832",
  appId: "1:417026728832:web:76fd77285569ca6541d765",
  measurementId: "G-7NLBTVGEYB"
};
// Initalize Firebase
firebase.initializeApp(firebaseConfig);
const firebaseAuthentication = firebase.auth();
const firebaseFireStore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const userSubmissions = firebaseFireStore.collection("users");

firebaseFireStore.settings({ timestampsInSnapshoot: true });

export const createSubmission = (submission) => {
  //Add user ID property from auth
  submission.userId = firebaseAuthentication.currentUser.uid;
  return userSubmissions
    .doc(submission.userId)
    .collection("submissions")
    .add(submission);
};
export const firestoreQuery = async (internalResults) => {
  const query =  await firebaseFireStore
    .collectionGroup("submissions")
    .where("tags", "array-contains", internalResults).get();
      return query.docs.map((doc)=>{
        return doc.data();
      });
  };

export const deleteUserSubmission = async (selectedDoc) => {
  userSubmissions.doc(firebaseAuthentication.currentUser.uid)
    .collection("submissions")
    .where("tags", "==", selectedDoc).get().then((qSnap)=>{
       qSnap.docs.forEach(doc => doc.ref.delete())
    });
};

export const getAllSubmissions = async () => {
  const query = await userSubmissions
    .doc(firebaseAuthentication.currentUser.uid)
    .collection("submissions")
    .where("userId", "==", firebaseAuthentication.currentUser.uid)
    .get();
  return query.docs.map((doc) => {
    return doc.data();
  });
};

export { firebaseAuthentication, firebaseFireStore, timestamp };
