import React, { useState, useEffect, useRef, useCallback } from 'react';
import './InfiniteScroll.css';

const ACCESS_KEY = 'kdCb6AdtlPH3g6lr9mXF3XEFb6_JTxRALxKuL5E5eyo';

const InfiniteScroll = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPhotos = useCallback(async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `https://api.unsplash.com/photos?page=${page}&per_page=10&client_id=${ACCESS_KEY}`
      );
      const data = await res.json();

      if (data && data.length > 0) {
        setPhotos((prev) => [...prev, ...data]);
        if (data.length < 10) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
      setHasMore(false);
    }

    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  const observer = useRef();
  const lastPhotoRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prev) => prev + 1);
          }
        },
        {
          rootMargin: '200px',
          threshold: 0.1,
        }
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="infinite-container">
      <h1>Infinite Scroll โดยใช้ Unsplash API</h1>
      <div className="photo-list">
        {photos.map((photo, index) => {
          const isLast = index === photos.length - 1;
          return (
            <div
              className="photo-card"
              key={photo.id}
              ref={isLast ? lastPhotoRef : null}
            >
              <img
                src={photo.urls.small}
                alt={photo.alt_description || 'Unsplash Photo'}
              />
              <p>{photo.description || photo.alt_description || 'Untitled'}</p>
              <small>By: {photo.user.name}</small>

              <div className="tooltip">
                <p>👍 Likes: {photo.likes}</p>
                <p>📍 Location: {photo.location?.name || 'Unknown'}</p>
              </div>
            </div>
          );
        })}
      </div>
      {loading && <p className="loading">Loading...</p>}
      {!hasMore && <p className="no-more">No more data.</p>}
    </div>
  );
};

export default InfiniteScroll;





