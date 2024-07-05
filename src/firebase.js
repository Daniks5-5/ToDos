// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Required for side-effects
import "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBohOxLe5EZuHwKEX3VSDmbmKNBnjkAELA",
  authDomain: "todo-e5bd5.firebaseapp.com",
  projectId: "todo-e5bd5",
  storageBucket: "todo-e5bd5.appspot.com",
  messagingSenderId: "322448253014",
  appId: "1:322448253014:web:823c8058f8e876ae0e1bf7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app); //database, хранит в себе базу данных и возможности с ней работы

//база данных и её коллекция
async function add() {

  try {
    const docRef = await addDoc(collection(db, "todos"), { //todos имя коллекции и создаю новый документ с помощью метода addDoc и он же API
      title: "Задача 3",
      status: "active"
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

//чтение записей
async function get(){
  const querySnapshot = await getDocs(collection(db, "todos"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data().title}`);
});

}

get();
add();


