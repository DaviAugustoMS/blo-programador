import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './stylles.css';

class Register extends Component{

  constructor(props){
    super(props);
    this.state = {
      nome: '',
      email: '',
      password: ''
    };

    this.register = this.register.bind(this);
    this.onRegister = this.onRegister.bind(this);

  }

  register(e){
    e.preventDefault();

    this.onRegister();
  }

  onRegister = async () => {
    try {
      const {nome, email, password} = this.state;

      await firebase.register(nome, email, password);
      this.props.history.replace('/dashboard');

    } catch (error) {
      alert(error.message)
    }
  }

  render(){
    return(
      <div className="box-cadastro">
        <h1>Novo Usuario</h1>
        <form onSubmit={this.register} id="cadastro">

          <label>Nome:</label> 
          <input type="text" autoComplete="off" autoFocus value={this.state.nome}
          onChange={(e) => this.setState({nome: e.target.value})} placeholder="Nome completo" />

          <label>Email:</label> 
          <input type="email" autoComplete="off" autoFocus value={this.state.email}
          onChange={(e) => this.setState({email: e.target.value})} placeholder="teste@email.com" />

          <label>Senha:</label> 
          <input type="password" autoComplete="off" value={this.state.password}
          onChange={(e) => this.setState({password: e.target.value})} placeholder="********" /> 

          <button type="submit">Cadastrar</button>

          <Link to="/login">Já possui uma conta?</Link>
        </form>
      </div>
    );
  }
}

export default withRouter(Register);