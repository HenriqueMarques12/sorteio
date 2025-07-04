import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      backgroundColor: '#f8d7da',
      color: '#721c24',
      padding: '40px 20px',
      margin: '50px auto',
      maxWidth: '600px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      border: '1px solid #f5c6cb'
    }}>
      <h1 style={{
        fontSize: '2.5em',
        marginBottom: '20px',
        color: '#dc3545'
      }}>
        Sistema Suspenso
      </h1>
      <p style={{
        fontSize: '1.2em',
        marginBottom: '15px',
        lineHeight: '1.5'
      }}>
        Seu sistema foi suspenso por falta de pagamento da Resolve Energia Solar.
      </p>
      <p style={{
        fontSize: '1.2em',
        lineHeight: '1.5'
      }}>
        Por favor, entre em contato para regularizar sua situação.
      </p>
      <p style={{
        fontSize: '1em',
        marginTop: '30px',
        color: '#6c757d'
      }}>
      </p>
    </div>
  </StrictMode>
);
