import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, writeBatch, doc} from "firebase/firestore";




const firebaseConfig = {
  apiKey: "AIzaSyBohOxLe5EZuHwKEX3VSDmbmKNBnjkAELA",
  authDomain: "todo-e5bd5.firebaseapp.com",
  projectId: "todo-e5bd5",
  storageBucket: "todo-e5bd5.appspot.com",
  messagingSenderId: "322448253014",
  appId: "1:322448253014:web:823c8058f8e876ae0e1bf7"
};

//cоздания объекта хранилища данных
export function createStorage(key) {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return {
    key, // ключ хранилища 
    db, //объект базы данных
    pull: async function () { // асинхронный метод для извлечения данных из коллекции с указанным ключом
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
    push: async function (todo) { //отправляет данные в local
      try {
        //отправка данных в firebase
        const docRef = await addDoc(collection(this.db, this.key), { //todos имя коллекции и создаю новый документ с помощью метода addDoc и он же API
          title: todo.title,
          status: todo.status,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    //удаление данных из бд
    delete: async function(todos){
      const batch = writeBatch(this.db);

      todos.forEach((todo) =>{
      const laRef = doc(this.db, this.key, todo.id);
      batch.delete(laRef);

      });
      await batch.commit();

   




    }
  };
}