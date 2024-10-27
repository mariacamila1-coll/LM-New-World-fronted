import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Prensa.css';
import logo from './components/Logo.jpg';

const Prensa = () => {
    const [news, setNews] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [editId, setEditId] = useState(null);

    // Función para obtener noticias
    const fetchNews = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/news');
            setNews(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching news:', error);
            setNews([]); // Establece news como un array vacío en caso de error
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newsData = {
            user_id: 1, // Cambiar esto por el ID del usuario autenticado
            title,
            description,
            image_url: url
        };

        try {
            if (editId) {
                await axios.put(`http://localhost:5000/api/news/${editId}`, newsData);
            } else {
                await axios.post('http://localhost:5000/api/news', newsData);
            }
            // Limpiar el formulario después de enviar
            setTitle('');
            setDescription('');
            setUrl('');
            setEditId(null);
            fetchNews(); // Vuelve a cargar las noticias
        } catch (error) {
            console.error('Error submitting news:', error);
            alert('Error al enviar la noticia.'); // Notificar al usuario sobre el error
        }
    };

    // Manejar la edición de noticias
    const handleEdit = (newsItem) => {
        setTitle(newsItem.title);
        setDescription(newsItem.description);
        setUrl(newsItem.image_url);
        setEditId(newsItem.id);
    };

    // Manejar la eliminación de noticias
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/news/${id}`);
            fetchNews(); // Recargar las noticias después de eliminar
        } catch (error) {
            console.error('Error deleting news:', error);
            alert('Error al eliminar la noticia.'); // Notificar al usuario sobre el error
        }
    };

    return (
        <div className="parent-container"> {/* Contenedor principal */}
            <div className="header-container">
                <img src={logo} alt="Logo LM News World" className="logo-image" />
                
            </div>
            
            <div className="prensa-container">
            <h2 className="titulo-prensa">AGREGA UNA NOTICIA</h2>
                <form onSubmit={handleSubmit} className="form-container">
                    <input
                        type="text"
                        placeholder="Título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Descripción"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="URL de la imagen"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                    />
                    <button type="submit">{editId ? 'Actualizar' : 'Crear'}</button>
                </form>
                <div id="news-container">
                    {news.length > 0 ? (
                        news.map((newsItem) => (
                            <div key={newsItem.id} className="news-item">
                                <h2>{newsItem.title}</h2>
                                <p>{newsItem.description}</p>
                                <img src={newsItem.image_url} alt={newsItem.title} className="news-image" />
                                <button onClick={() => handleEdit(newsItem)}>Editar</button>
                                <button onClick={() => handleDelete(newsItem.id)}>Eliminar</button>
                            </div>
                        ))
                    ) : (
                        <p>No hay noticias disponibles.</p>
                    )}
                </div>
            </div>
        </div>
    );
    
    
};

export default Prensa;
