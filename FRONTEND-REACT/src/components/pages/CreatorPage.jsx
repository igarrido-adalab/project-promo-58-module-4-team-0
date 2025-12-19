import { useState, useEffect } from 'react';

import { Link } from 'react-router';

import Preview from '../create/Preview';
import Form from '../create/Form';
import Hero from '../layout/Hero';

const INITIAL_DATA = {
  name: '',
  slogan: '',
  repo: '',
  demo: '',
  technologies: '',
  description: '',
  photo: '',
  image: '',
  author: '',
  job: '',
};

function CreatorPage() {
  /*   const [name, setName] = useState('');
  const [slogan, setSlogan] = useState(''); */

  const [data, setData] = useState(
    JSON.parse(localStorage.getItem('form-backup')) || INITIAL_DATA
  );

  useEffect(() => {
    // Este código se lanza cada vez que cambia la variable data

    localStorage.setItem('form-backup', JSON.stringify(data));
  }, [data]);

  const changeData = (fieldName, value) => {
    setData({
      ...data,
      [fieldName]: value,
    });
  };

  /*   const handleInputProjectName = (ev) => {
    setData({
      ...data,
      name: ev.target.value,
    });

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
    * /

    // setName(ev.target.value);
    // nombreProyecto = ev.target.value;
  }; */

  /*   const handleInputSlogan = (ev) => {
    setData({
      ...data,
      slogan: ev.target.value,
    });
  }; */

  return (
    <>
      <Hero>
        <Link className='button--link' to='/'>
          Volver al listado
        </Link>
      </Hero>

      <Preview data={data} />

      <Form data={data} changeData={changeData} />
    </>
  );
}

export default CreatorPage;
