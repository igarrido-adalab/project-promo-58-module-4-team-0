import '../styles/App.scss';
import BrandLogo from '../images/laptop-code-solid.svg';
import CompanyLogo from '../images/adalab.png';
import { Routes, Route } from 'react-router';
import LandingPage from './pages/LandingPage';
import CreatorPage from './pages/CreatorPage';

function App() {
  return (
    <div className='container'>
      <header className='header'>
        <a
          className='header__brand'
          href='./'
          title='Haz click para volver a la página inicial'
        >
          <img
            className='header__companyLogo'
            src={BrandLogo}
            alt='Logo proyectos molones'
          />
          <h1 className='header__title'>Proyectos molones</h1>
        </a>
        <img className='logoSponsor' src={CompanyLogo} alt='Logo Adalab' />
      </header>

      <main className='main'>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/creator' element={<CreatorPage />} />
        </Routes>
      </main>

      <footer className='footer'>
        <img className='logoSponsor' src={CompanyLogo} alt='Logo Adalab' />
      </footer>
    </div>
  );
}

export default App;
