import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './stylles.css';

class Login extends Component{

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.entrar = this.entrar.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount(){
    // Verivicar se tem algum usuario logado
    if(firebase.getCurrent()){
      return this.props.history.replace('dashboard');
    }
  }

  entrar(e){
    e.preventDefault();

    this.login();
  }

  login = async () => {
    const {email, password} = this.state;
    
    try {
      
      await firebase.login(email, password)
      .then(response => {
        this.props.history.replace('/dashboard');
        console.log(response)
      })
      .catch((error) => {
        if(error.code === 'auth/user-not-found'){
          alert('Este usuario não existe!');
        }else{
          alert('Codigo de erro:' + error.code);
          return null;
        }
      });


    } catch (error) {
      alert(error.message);
    }

    
    
  }

  render(){
    return(
      <div className="box-login">
        <h1>Login</h1>
        <form onSubmit={this.entrar} id="login">
          <label>Email:</label> 
          <input type="email" autoComplete="off" autoFocus value={this.state.email}
          onChange={(e) => this.setState({email: e.target.value})} placeholder="teste@email.com" />
          <label>Senha:</label> 
          <input type="password" autoComplete="off" value={this.state.password}
          onChange={(e) => this.setState({password: e.target.value})} placeholder="********" /> 

          <button type="submit">Entrar</button>

          <Link to="/register">Ainda não possui uma conta?</Link>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);