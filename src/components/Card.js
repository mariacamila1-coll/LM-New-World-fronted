import React from 'react';
import styled from 'styled-components';

const Card = ({ article }) => {
  if (!article.imageUrl) return null; 

  return (
    <StyledWrapper>
      <div className="news-card" onClick={() => window.open(article.url, '_blank')}>
        <img src={article.imageUrl} alt="Noticia" className="news-image" />
        <div className="news-content">
          <h2 className="news-title">{article.title || "Título desconocido"}</h2>
          <p className="news-description">
            {article.description || "Descripción no disponible"}
          </p>
        </div>
      </div>
    </StyledWrapper>
  );
  
}

const StyledWrapper = styled.div`
  .card {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    position: relative;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 400px; /* Aumentar la altura de la tarjeta */
    border-radius: 15px;
    transition: transform 0.3s, box-shadow 0.3s;
    background-color: #1a1a1a; /* Color de fondo más suave */
    overflow: hidden; /* Evita el desbordamiento */
    cursor: pointer; /* Cambia el cursor a mano al pasar sobre la tarjeta */
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4); /* Sombra suave */
    border: 2px solid #000; /* Borde llamativo */
  }

  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Asegura que la imagen cubra el área de la tarjeta */
    transition: opacity 0.3s ease-in-out;
    border-radius: 15px; /* Alineación de borde redondeado */
  }

  .card-content {
    padding: 20px;
    text-align: center;
    color: transparent;
    transition: all 0.7s;
    opacity: 0;
    position: absolute; /* Asegura que el contenido esté sobre la imagen */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8); /* Fondo negro con opacidad */
    border-radius: 15px; /* Borde redondeado */
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3); /* Sombra interna más suave */
  }

  .card-title {
    font-size: 22px; /* Aumentar el tamaño del título */
    font-weight: bold;
    color: #8c52ff; /* Color del título llamativo */
    margin-bottom: 10px; /* Espaciado debajo del título */
    transition: color 0.3s; /* Transición de color */
  }

  .card-description {
    font-size: 16px; /* Aumentar el tamaño de la descripción */
    color: #fff; /* Color blanco para la descripción */
    text-align: center; /* Centra el texto */
    overflow-y: auto; /* Permite la barra de desplazamiento cuando el texto es demasiado largo */
    max-height: 60%; /* Limita la altura del área donde se muestra el texto */
    padding: 10px; /* Agrega algo de espacio alrededor del texto */
    margin-top: 10px; /* Alinea el texto debajo del título */
    width: 100%; /* Asegura que ocupe el ancho total disponible */
  }

  /* Estilo de la barra de desplazamiento personalizada */
  .card-description::-webkit-scrollbar {
    width: 8px;
  }

  .card-description::-webkit-scrollbar-thumb {
    background-color: #8c52ff; /* Color de la barra */
    border-radius: 10px; /* Redondeo de la barra */
  }

  .card-description::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.2); /* Color de la pista */
    border-radius: 10px; /* Redondeo de la pista */
  }

  .card:hover {
    transform: translateY(-5px); /* Efecto de elevación */
    box-shadow: 0 0 20px rgba(140, 82, 255, 0.6), 0 0 40px rgba(140, 82, 255, 0.5), 0 0 60px rgba(140, 82, 255, 0.4); /* Efecto de neón */
    border-color: #8c52ff; /* Cambiar el color del borde al hacer hover */
  }

  .card:hover > .card-image {
    opacity: 0.5; /* Cambiar la opacidad de la imagen al hacer hover */
  }

  .card:hover > .card-content {
    opacity: 1; /* Muestra el contenido al hacer hover */
    color: #fff; /* Asegura que el texto sea blanco al mostrar el contenido */
  }
`;


export default Card;
