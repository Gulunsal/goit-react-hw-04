import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import { fetchImages } from './api';
import './App.css';

const App = () => {
  // State tanımları
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Arama işlemi
  const handleSearch = async (newQuery) => {
    if (newQuery === query) {
      toast.error('Aynı anahtar kelimeyle tekrar arama yapıldı!');
      return;
    }

    setQuery(newQuery);
    setImages([]); // Önceki görselleri temizle
    setPage(1);
    setError(null); // Hata durumunu sıfırla

    try {
      setLoading(true);
      const data = await fetchImages(newQuery, 1); // İlk sayfa için görselleri getir
      if (data.results.length === 0) {
        toast.error('Sonuç bulunamadı!');
        return;
      }
      setImages(data.results);
      toast.success('Arama başarıyla tamamlandı!');
    } catch (err) {
      setError(err.message);
      toast.error(`Bir hata oluştu: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Daha fazla görsel yükleme işlemi
  const handleLoadMore = async () => {
    try {
      setLoading(true);
      const data = await fetchImages(query, page + 1); // Sonraki sayfa için görselleri getir
      setImages((prevImages) => [...prevImages, ...data.results]);
      setPage((prevPage) => prevPage + 1);
      toast.success('Daha fazla görsel yüklendi!');
    } catch (err) {
      setError(err.message);
      toast.error(`Daha fazla görsel yüklenirken hata oluştu: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Modal açma işlemi
  const handleOpenModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  // Modal kapatma işlemi
  const handleCloseModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  return (
    <div>
      {/* Arama çubuğu */}
      <SearchBar onSubmit={handleSearch} />

      {/* Bildirimler */}
      <Toaster position="top-right" />

      {/* Hata mesajı */}
      {error && <ErrorMessage message={error} />}

      {/* Görsel galerisi */}
      <ImageGallery images={images} onImageClick={handleOpenModal} />

      {/* Yükleme göstergesi */}
      {loading && <Loader />}

      {/* Daha fazla yükle butonu */}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}

      {/* Modal */}
      {showModal && (
        <ImageModal image={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
