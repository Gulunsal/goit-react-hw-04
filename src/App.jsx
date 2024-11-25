import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import { fetchImages } from './api';
import './App.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearch = async (newQuery) => {
    if (newQuery === query) {
      toast.error('Aynı anahtar kelimeyle tekrar arama yapıldı!');
      return;
    }

    setQuery(newQuery);
    setImages([]);
    setPage(1);
    try {
      setLoading(true);
      const data = await fetchImages(newQuery, 1);
      if (data.results.length === 0) {
        toast.error('Sonuç bulunamadı.');
        return;
      }
      setImages(data.results);
    } catch (error) {
      toast.error('Bir hata oluştu!');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      setLoading(true);
      const data = await fetchImages(query, page + 1);
      setImages((prevImages) => [...prevImages, ...data.results]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      toast.error('Daha fazla görsel yüklenemedi.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  return (
    <div>
      {/* Header Sabit Arama Çubuğu */}
      <header className="app-header">
        <SearchBar onSubmit={handleSearch} />
      </header>

      {/* Bildirimler */}
      <Toaster position="top-right" />

      {/* Resim Galerisi */}
      <main>
        <ImageGallery images={images} onImageClick={handleOpenModal} />
        {loading && <Loader />}
        {images.length > 0 && !loading && (
          <LoadMoreBtn onClick={handleLoadMore} />
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <ImageModal image={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
