import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


    let firebaseConfig = {
      apiKey: "AIzaSyDoBI-CiQqK7jZ350rMM2KfDLMqzy5thyA",
      authDomain: "react-fire-aa9ec.firebaseapp.com",
      databaseURL: "https://react-fire-aa9ec.firebaseio.com",
      projectId: "react-fire-aa9ec",
      storageBucket: "react-fire-aa9ec.appspot.com",
      messagingSenderId: "827806798151",
      appId: "1:827806798151:web:99851289061c6c3fb03c62",
      measurementId: "G-9YEQLZTYXT"
    };


class Firebase{
  constructor(){
    app.initializeApp(firebaseConfig);

    this.app = app.database();
    
  }
  

  login(email, password){
    return app.auth().signInWithEmailAndPassword(email, password)
  }

  async register(nome, usuario, email, password){
    await app.auth().createUserWithEmailAndPassword(email, password)

    const uid = app.auth().currentUser.uid;

    return app.database().ref('usuarios').child(uid).set({
      nome: nome,
      usuario: usuario
    })

  }
  

  isInitialized(){
    return new Promise(resolve =>{
      app.auth().onAuthStateChanged(resolve);
    })
  }

  getCurrent(){
    return app.auth().currentUser && app.auth().currentUser.email
  }
}

export default new Firebase;