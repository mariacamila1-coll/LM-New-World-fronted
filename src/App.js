// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import logo from './components/Logo.jpg'; // Importa la imagen
import About from './About'; // Asegúrate de que esta ruta sea correcta
import Login from './Login'; // Asegúrate de que esta ruta sea correcta

function App() {
    const [keyword, setKeyword] = useState('');
    const [news, setNews] = useState([]);

    const fetchNews = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/news?keyword=${keyword}`);
            setNews(response.data.articles);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route 
                        path="/" 
                        element={
                            <>
                                <div className="top-container">
                                    <button onClick={() => window.open('/about', '_blank')} className="side-button">About us</button>
                                    <p style={{ display: 'inline-block', margin: '0 20px' }}>LM</p>
                                    <button onClick={() => window.open('/login', '_blank')} className="side-button">Login</button>
                                </div>

                                <div className="logo">
                                    <img src={logo} alt="Logo LM News World" className="logo-image" />
                                </div>
                                <h1>LM News World</h1>
                                <div className="search-container">
                                    <input 
                                        type="text" 
                                        id="keyword" 
                                        value={keyword}
                                        onChange={(e) => setKeyword(e.target.value)}
                                        placeholder="Buscar noticias..."
                                    />
                                    <button id="searchBtn" onClick={fetchNews}>Buscar</button>
                                </div>

                                <div id="news-container">
                                    {news.map((article, index) => (
                                        <div key={index} className="news-item">
                                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                                                <h2>{article.title}</h2>
                                                <p>{article.description}</p>
                                                {article.urlToImage && (
                                                    <img className="news-image" src={article.urlToImage} alt="Imagen de noticia" />
                                                )}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </>
                        } 
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App; 
