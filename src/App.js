import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import logo from './components/Logo.jpg';
import About from './About';
import Login from './Login';
import Prensa from './Prensa';
import Card from './components/Card';
import Button from './components/Button'; 
import './components/Carga.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [internalNews, setInternalNews] = useState([]);
    const [externalNews, setExternalNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        const fetchInternalNews = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/internal-news');
                setInternalNews(response.data);
            } catch (error) {
                console.error('Error fetching internal news:', error);
            }
        };

        fetchInternalNews();
    }, []);

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
                                <h1>-</h1>

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
                                        <div className="loading-message">
                                            <div class="container">
                                                <div class="top">
                                                    <div class="square">
                                                        <div class="square">
                                                            <div class="square">
                                                                <div class="square">
                                                                    <div class="square"><div class="square">
                                                                    </div></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="bottom">
                                                    <div class="square">
                                                        <div class="square">
                                                            <div class="square">
                                                                <div class="square">
                                                                    <div class="square"><div class="square">
                                                                    </div></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="left">
                                                    <div class="square">
                                                        <div class="square">
                                                            <div class="square">
                                                                <div class="square">
                                                                    <div class="square"><div class="square">
                                                                    </div></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="right">
                                                    <div class="square">
                                                        <div class="square">
                                                            <div class="square">
                                                                <div class="square">
                                                                    <div class="square"><div class="square">
                                                                    </div></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            {internalNews.map((article, index) => (
                                                <Card key={index} article={article} isInternal />
                                            ))}
                                            {externalNews.map((article, index) => (
                                                <Card key={`ext-${index}`} article={article} />
                                            ))}
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
