import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

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
        <div className="App">
            <div className="logo">
                <img src="src/logoNewsLorox.png" alt="Logo LM News World" className="logo-image" />
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
                            {article.urlToImage && <img className="news-image" src={article.urlToImage} alt="Imagen de noticia" />}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
