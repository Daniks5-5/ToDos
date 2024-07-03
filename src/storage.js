import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, writeBatch, doc, serverTimestamp, query, orderBy, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBohOxLe5EZuHwKEX3VSDmbmKNBnjkAELA",
  authDomain: "todo-e5bd5.firebaseapp.com",
  projectId: "todo-e5bd5",
  storageBucket: "todo-e5bd5.appspot.com",
  messagingSenderId: "322448253014",
  appId: "1:322448253014:web:823c8058f8e876ae0e1bf7"
};

// Создание объекта хранилища данных
export function createStorage(key) {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return {
    key, // ключ хранилища 
    db, // объект базы данных
    pull: async function () {
      const ref = collection(this.db, this.key);
      const q = query(ref, orderBy("createdAt", "desc")); // "desc" выводит задачи по порядку, новые сверху
      const querySnapshot = await getDocs(q);
      const todos = [];
      querySnapshot.forEach((doc) => {
        todos.push({
          id: doc.id,
          title: doc.data().title,
          body: doc.data().body,
        });
        console.log(`${doc.id} => ${doc.data().title}`);
      });
      return todos;
    },
    push: async function (todo) {
      try {
        // Отправка данных в Firebase
        const docRef = await addDoc(collection(this.db, this.key), {
          title: todo.title,
          body: todo.body,
          status: todo.status,
          createdAt: serverTimestamp(),
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    // Удаление данных из базы данных
    delete: async function(todos) {
      const batch = writeBatch(this.db);
      todos.forEach((todo) => {
        const todoRef = doc(this.db, this.key, todo.id);
        batch.delete(todoRef);
      });
      await batch.commit();
    }
  };
}