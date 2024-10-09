import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import logo from './components/Logo.jpg'; 
import About from './About'; 
import Login from './Login'; 
import Prensa from './Prensa';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    const fetchNews = async (searchKeyword) => {
        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.get(`http://localhost:5000/api/external-news?q=${searchKeyword}`);
            setNews(response.data);
            setSuccessMessage('Noticias cargadas con éxito.');
        } catch (error) {
            console.error('Error fetching news:', error);
            setError('Hubo un error al cargar las noticias del servidor.');
        } finally {
            setLoading(false);
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
        }
    };

    const handleSearch = () => {
        if (!keyword.trim()) {
            setError('Debes escribir algo para buscar una noticia.');
            setSuccessMessage('');
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
            return;
        }
        fetchNews(keyword);
    };

    useEffect(() => {
        // Puedes usar esto para buscar noticias al montar el componente si lo deseas
        // fetchNews('tecnología');
    }, []);

    // Define la clase de la notificación en función del estado
    const notificationClass = error
        ? error.includes('servidor') ? 'server-error' : 'input-error'
        : 'success';

    return (
        <Router>
            <div className="App">
                {showNotification && (
                    <div className={`notification ${notificationClass}`}>
                        <p>{error || successMessage}</p>
                    </div>
                )}
                <Routes>
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/prensa" element={isAuthenticated ? <Prensa /> : <Navigate to="/login" />} />
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
                                    <button id="searchBtn" onClick={handleSearch}>Buscar</button>
                                </div>

                                <div id="news-container">
                                    {loading ? (
                                        <p>Cargando noticias...</p>
                                    ) : (
                                        news.map((article, index) => (
                                            <div key={index} className="news-item">
                                                <a href={article.url} target="_blank" rel="noopener noreferrer">
                                                    <h2>{article.title}</h2>
                                                    <p>{article.description}</p>
                                                    {article.imageUrl && (
                                                        <img className="news-image" src={article.imageUrl} alt="Imagen de noticia" />
                                                    )}
                                                </a>
                                            </div>
                                        ))
                                    )}
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
