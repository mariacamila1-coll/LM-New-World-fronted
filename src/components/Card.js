import React from 'react';
import styled from 'styled-components';

const Card = ({ article }) => {
  if (!article.imageUrl) return null; 

  return (
    <StyledWrapper>
      <div className="card" onClick={() => window.open(article.url, '_blank')}>
        <img src={article.imageUrl} alt="Noticia" className="card-image" />
        <div className="card-content">
          <h2 className="card-title">{article.title || "Título desconocido"}</h2>
          <p className="card-description">
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
    overflow: hidden; /* Evita desbordamiento */
    display: -webkit-box;
    -webkit-line-clamp: 5; /* Limita a 5 líneas para más espacio */
    -webkit-box-orient: vertical;
    max-width: 100%; /* Limita el ancho */
    text-align: center; /* Centra el texto */
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
