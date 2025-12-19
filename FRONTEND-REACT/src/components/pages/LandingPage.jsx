import { useState, useEffect } from 'react';
import Hero from '../layout/Hero';
import Card from '../create/Card';
import { Link } from 'react-router';

function LandingPage() {
  const [projects, setProjects] = useState([]);

  const server = import.meta.env.PROD
    ? 'https://project-promo-58-module-4-team-0.onrender.com'
    : 'http://localhost:3000';

  useEffect(() => {
    fetch(`${server}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      });
  }, []);

  return (
    <>
      <Hero
        children={
          <Link className='button--link' to='/creator'>
            Añade tu proyecto súper molón
          </Link>
        }
      />
      Listado de proyectos
      {projects.map((project) => (
        <Card key={project.id} data={project} />
      ))}
    </>
  );
}

export default LandingPage;
