import { useState } from 'react';
import GetAvatar from './GetAvatar';

function Form({ data, changeData }) {
  const [sendStatus, setSendStatus] = useState('');
  const [projectURL, setProjectURL] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleInput = (ev) => {
    changeData(ev.target.id, ev.target.value);
  };

  const handleInputProjectName = (ev) => {
    changeData('name', ev.target.value);

    /* setData({
      ...data,
      name: ev.target.value,
    }); */

    /*
    setData(
      {
        name: data.name,      --> Esto lo hace el spread
        slogan: data.slogan,  --> Esto lo hace el spread
        repo: data.repo,      --> Esto lo hace el spread
        demo: data.demo,      --> Esto lo hace el spread
        name: ev.target.value
      }
    );
    */

    // setName(ev.target.value);
    // nombreProyecto = ev.target.value;
  };

  const handleInputSlogan = (ev) => {
    changeData('slogan', ev.target.value);

    /* setData({
      ...data,
      slogan: ev.target.value,
    }); */
  };

  const handleChangePhoto = (photoData) => {
    console.log('Has cambiado la foto del proyecto', photoData);

    changeData('photo', photoData);

    /* setData({
      ...data,
      photo: photoData,
    }); */
  };

  const handleChangeImage = (imageData) => {
    changeData('image', imageData);

    /* setData({
      ...data,
      image: imageData,
    }); */
  };

  const handleClick = () => {
    setSendStatus('pending');

    fetch('http://localhost:3000/api/project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success) {
          // Hacemos algo para indicar a la usuaria la dirección que nos devuelve el servidor
          setSendStatus('ok');
          setProjectURL(responseData.projectURL);
        } else {
          // Hacemos algo para indicar a la usuaria que hay un error en los datos.
          setSendStatus('error');
          setErrorMsg(responseData.error);
        }
      })
      .catch(() => {
        setSendStatus('error');
        setErrorMsg('Error gordo en el servidor.');
      });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  return (
    <form className='addForm' onSubmit={handleSubmit}>
      <h2 className='title'>Información</h2>
      <fieldset className='addForm__group'>
        <legend className='addForm__title'>Cuéntanos sobre el proyecto</legend>
        <input
          className='addForm__input'
          type='text'
          name='name'
          id='name'
          placeholder='Nombre del proyecto'
          onInput={handleInputProjectName}
          value={data.name}
        />
        <input
          className='addForm__input'
          type='text'
          name='slogan'
          id='slogan'
          placeholder='Slogan'
          onInput={handleInputSlogan}
          value={data.slogan}
        />
        <div className='addForm__2col'>
          <input
            className='addForm__input'
            type='url'
            name='repo'
            id='repo'
            placeholder='Repositorio'
            onInput={handleInput}
            value={data.repo}
          />
          <input
            className='addForm__input'
            type='url'
            name='demo'
            id='demo'
            placeholder='Demo'
            onInput={handleInput}
            value={data.demo}
          />
        </div>
        <input
          className='addForm__input'
          type='text'
          name='technologies'
          id='technologies'
          placeholder='Tecnologías'
          onInput={handleInput}
          value={data.technologies}
        />
        <textarea
          className='addForm__input'
          type='text'
          name='description'
          id='description'
          placeholder='Descripción'
          rows='5'
          onInput={handleInput}
          value={data.description}
        ></textarea>
      </fieldset>

      <fieldset className='addForm__group'>
        <legend className='addForm__title'>Cuéntanos sobre la authora</legend>
        <input
          className='addForm__input'
          type='text'
          name='author'
          id='author'
          placeholder='Nombre'
          onInput={handleInput}
          value={data.author}
        />
        <input
          className='addForm__input'
          type='text'
          name='job'
          id='job'
          placeholder='Trabajo'
          onInput={handleInput}
          value={data.job}
        />
      </fieldset>

      <fieldset className='addForm__group--upload'>
        <GetAvatar
          text='Subir foto del proyecto'
          updateAvatar={handleChangePhoto}
        />

        <GetAvatar
          text='Subir foto de la authora'
          updateAvatar={handleChangeImage}
        />

        {/*  <label className='button'>
          OLD Subir foto del proyecto
          <input className='addForm__hidden' type='file' />
        </label>

        <label className='button'>
          Subir foto de la authora
          <input className='addForm__hidden' type='file' />
        </label> */}
        <button onClick={handleClick} className='button--large'>
          Guardar proyecto
        </button>
      </fieldset>

      {sendStatus !== '' && (
        <fieldset className='addForm__group'>
          {sendStatus === 'pending' && (
            <p className='addForm__title'>Enviando datos...</p>
          )}
          {sendStatus === 'error' && (
            <p className='addForm__title'>Ha habido un error {errorMsg}</p>
          )}
          {sendStatus === 'ok' && (
            <p className='addForm__title'>
              Se ha guardado tu proycto en la siguiente dirección{' '}
              <a target='_blank' href={projectURL}>
                {projectURL}
              </a>
            </p>
          )}
        </fieldset>
      )}
    </form>
  );
}

export default Form;
