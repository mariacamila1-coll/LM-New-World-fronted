import React from 'react';
import './components/about.css';

// Importar las imágenes
import lauraImg from './components/laura.png';
import lorenzoImg from './components/lorenzo.png';
import camilaImg from './components/camila.png';

function About() {
    return (
        <div className="about-page">
            <div className="about-container">
                <h2>Gracias por visitar nuestra plataforma de noticias. Este sitio ha sido creado para ofrecer una experiencia informativa confiable y actualizada.</h2>
                <section className="equipo">
                    <a href="https://github.com/Lau-devMl" target="_blank" rel="noopener noreferrer" className="tarjeta">
                        <p>Laura Acevedo González</p> 
                        <img src={lauraImg} alt="Laura" className="perfil-foto" />
                        <p>Tecnóloga en Sistemas</p>
                        <div className="Logos"> 
                            <img src="https://skillicons.dev/icons?i=cs,cpp,py,css,html,js,git,github,linkedin,matlab,visualstudio,vscode,mysql,dotnet,react&perline=6" alt="Logos de habilidades" className="logo-img" />
                        </div>
                    </a>

                    <a href="https://github.com/Lorox10" target="_blank" rel="noopener noreferrer" className="tarjeta">
                        <p>Lorenzo Vargas Sala</p> 
                        <img src={lorenzoImg} alt="Lorenzo" className="perfil-foto" />
                        <p>Ingeniero en Sistemas</p>
                        <div className="Logos"> 
                            <img src="https://skillicons.dev/icons?i=cs,cpp,py,css,html,js,git,github,linkedin,matlab,visualstudio,vscode,pr,ps,blender,mysql,dotnet,react&perline=6" alt="Logos de habilidades" className="logo-img" />
                        </div>
                    </a>

                    <a href="https://github.com/mariacamila1-coll" target="_blank" rel="noopener noreferrer" className="tarjeta">
                        <p>María Camila Campo Muñoz</p>
                        <img src={camilaImg} alt="Camila" className="perfil-foto" />
                        <p>Tecnóloga en Sistemas</p>
                        <div className="Logos"> 
                            <img src="https://skillicons.dev/icons?i=css,html,js,git,github,visualstudio,vscode,mysql,dotnet,react&perline=6" alt="Logos de habilidades" className="logo-img" />
                        </div>
                    </a>
                </section>
            </div>
        </div>
    );
}

export default About;
