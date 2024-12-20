import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import './styles/App.css';
import logo from './assets/Logo.jpg';
import About from './pages/About';
import Login from './pages/Login';
import Prensa from './pages/Prensa';
import Card from './components/Card';
import Button from './components/Button';
import './styles/Carga.css';
import Card2 from './components/tiempo';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [internalNews, setInternalNews] = useState([]);
    const [externalNews, setExternalNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    // Obtener noticias internas desde el servidor
    useEffect(() => {
        const fetchInternalNews = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/news');
                setInternalNews(response.data);
            } catch (error) {
                console.error('Error fetching internal news:', error);
            }
        };

        fetchInternalNews();
    }, []);

    // Obtener noticias externas desde el servidor
    const fetchExternalNews = async (searchKeyword) => {
        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.get(`http://localhost:5000/api/external-news?q=${searchKeyword}`);
            setExternalNews(response.data);
            setSuccessMessage('Noticias cargadas con éxito.');
        } catch (error) {
            console.error('Error fetching external news:', error);
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
        fetchExternalNews(keyword);
    };

    const notificationClass = error
        ? error.includes('servidor') ? 'server-error' : 'input-error'
        : 'success';

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/prensa" element={isAuthenticated ? <Prensa /> : <Navigate to="/login" />} />
                    <Route
                        path="/"
                        element={
                            <>
                                <div className="top-container">
                                    <Button text="Nosotros" onClick={() => window.open('/about', '_blank')} />
                                    <Button text="Acceso" onClick={() => window.open('/login', '_blank')} />
                                </div>

                                <div className="logo">
                                    <img src={logo} alt="Logo LM News World" className="logo-image" />
                                </div>
                                <div className="App">
                                    <Card2 />
                                </div>
                                <div className="search-wrapper">
                                    <input
                                        type="text"
                                        id="keyword"
                                        value={keyword}
                                        onChange={(e) => setKeyword(e.target.value)}
                                        placeholder="Buscar noticias..."
                                    />
                                    <button id="searchBtn" onClick={handleSearch}>Buscar</button>

                                    {showNotification && (
                                        <span className={`notification ${notificationClass}`}>
                                            {error || successMessage}
                                        </span>
                                    )}
                                </div>

                                <div id="news-container">
                                    {loading ? (
                                        <div className="textWrapper">
                                            <p className="text">Loading...</p>
                                            <div className="invertbox"></div>
                                        </div>
                                    ) : (
                                        <>
                                            {/* Mostrar noticias internas */}
                                            {internalNews.length > 0 ? (
                                                internalNews.map((newsItem) => (
                                                    <div key={newsItem.id} className="news-card2">
                                                        <img src={newsItem.image_url} alt={newsItem.title} className="news-image" />
                                                        <div className="news-content">
                                                            <h2 className="news-title">{newsItem.title}</h2>
                                                            <p className="news-description">{newsItem.description}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No hay noticias internas disponibles.</p>
                                            )}




                                            {/* Mostrar noticias externas */}
                                            {externalNews.length > 0 ? (
                                                externalNews.map((article, index) => (
                                                    <Card key={`ext-${index}`} article={article} />
                                                ))
                                            ) : (
                                                <p></p>
                                            )}
                                        </>
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
