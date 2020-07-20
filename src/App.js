import React, { useState, useEffect } from 'react';
import ImageCard from './components/ImageCard';
import SearchImage from './components/SearchImage';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [textSearch, setTextSearch] = useState('');

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${textSearch}&image_type=photo&pretty=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [textSearch]);

  return (
    <div className='container mx-auto'>
      <SearchImage searchText={(text) => setTextSearch(text)} />
      {!isLoading && images.length === 0 && (
        <h1 className='text-center mx-auto text-6xl mt-50'>No Image Found</h1>
      )}
      {isLoading ? (
        <h1 className='text-center mx-auto text-6xl mt-50'>Loading....</h1>
      ) : (
        <div className='grid grid-cols-3 gap-4'>
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
