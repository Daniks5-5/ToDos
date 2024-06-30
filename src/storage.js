import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBohOxLe5EZuHwKEX3VSDmbmKNBnjkAELA",
  authDomain: "todo-e5bd5.firebaseapp.com",
  projectId: "todo-e5bd5",
  storageBucket: "todo-e5bd5.appspot.com",
  messagingSenderId: "322448253014",
  appId: "1:322448253014:web:823c8058f8e876ae0e1bf7"
};

export function createStorage(key) {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return {
    key,
    db,
    pull: async function () {
      const querySnapshot = await getDocs(collection(this.db, this.key));
      const todos = [];
      querySnapshot.forEach((doc) => {
        todos.push({
          id: doc.id,
          title: doc.data().title
        });
        console.log(`${doc.id} => ${doc.data().title}`);
      });
      return todos;
    },
    push: function (data) {
      return addDoc(collection(this.db, this.key), data);
    }
  };
}