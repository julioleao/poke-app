import Axios from 'axios';
import React, { Component } from 'react';

export default class Add extends Component {
  state = {
    base64String: '',
    name: '',
  };

  _handleReaderLoaded = (readerEvt) => {
    let binaryString = readerEvt.target.result;

    this.setState({
      base64String: btoa(binaryString),
    });
  };

  onChange = (e) => {
    console.log('file to upload: ', e.target.files[0]);
    let file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  };

  onFileSubmit = (e) => {
    e.preventDefault();
    const url = `http://localhost:3003/cards/${this.props.cards.id}`;
    const preview = document.getElementById('profile-picture');
    console.log('binary string: ', this.state.base64String);
    let payload = { img: this.state.base64String };
    Axios.patch(url, JSON.stringify(payload))
      .then((resp) => resp.json())
      .then((json) => console.log(json));

    preview.src = 'data:image/png;base64,' + this.state.base64String;
  };

  render() {
    return (
      <form className='container mt-5'>
        <div className='form-group'>
          <label>Nome</label>
          <input
            type='text'
            name='name'
            className='form-control'
            placeholder='Nome do Pokémon'
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
        <label>Imagem</label>
        <div className='form-inline'>
          <input
            type='file'
            name='img'
            accept='.jpeg, .png, .jpg'
            className='form-inline'
            placeholder='Insira uma imagem'
            onChange={(e) => this.onChange(e)}
          />
        </div>
        <div className='mt-4'>
          <button className='btn btn-primary btn-block' type='submit'>
            Adicionar
          </button>
        </div>
      </form>
    );
  }
}
