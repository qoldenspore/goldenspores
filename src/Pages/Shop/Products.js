import React, { useContext, useState } from 'react';
import './Products.css';
import { useEffect } from 'react';
import ProductContext from '../../Context/ProductContext';
import { Link } from 'react-router-dom';

const Products = () => {
  const { product } = useContext(ProductContext);
  const [newPath, setNewPath] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  function removeFileExtension(fileName) {
    const parts = fileName.split('.');
    if (parts.length > 1) {
      parts.pop();
      return parts.join('.').replace(/-/g, ' ');
    } else {
      return fileName;
    }
  }
  function removeDirectoryPath(filePath) {
    const lastSlashIndex = filePath.lastIndexOf('/');

    if (lastSlashIndex !== -1) {
      return filePath.substring(lastSlashIndex + 1);
    }

    return filePath;
  }

  useEffect(() => {
    const fetchData = () => {
      setNewPath(
        'https://goldensporesstore.000webhostapp.com/reactecomphp/uploads/',
      );
    };
    fetchData();
  }, [newPath]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = product.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(product.length / itemsPerPage);
  const pageNumbers = [];
  for (
    let i = Math.max(1, currentPage - 2);
    i <= Math.min(totalPages, currentPage + 2);
    i++
  ) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <section id="product1" className="section-p1">
        <h2>High Quality Products</h2>
        <p>
          We have done the most to provide the best quality and tested
          psychedelic products including magic mushrooms for sale grown from
          high grade magic mushroom spores.
        </p>
        <div className="pro-container">
          {currentItems.map((item) => {
            const fileNameWithExtension = item.itemName;
            const fileNameWithoutExtension = removeFileExtension(
              fileNameWithExtension,
            );
            const fullPath = item.image;
            const fileName = removeDirectoryPath(fullPath);
            const mainPath = newPath + fileName;
            return (
              <Link key={item.id} className="pro" to={`/products/${item.id}`}>
                <img src={mainPath} alt="" />
                <div className="des">
                  <span>{fileNameWithoutExtension}</span>
                  <h5>CATEGORY: {item.category}</h5>
                  <div className="star">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <h4>${item.price}</h4>
                </div>
                <span className="cart">
                  <i className="fas fa-shopping-cart"></i>
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      <div id="pagination" className="section-p1">
        <div>
          <button onClick={prevPage} disabled={currentPage === 1}>
            <i className="fas fa-long-arrow-alt-left"></i>
          </button>

          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={number === currentPage ? 'active' : ''}
            >
              {number}
            </button>
          ))}

          <button onClick={nextPage} disabled={currentPage === totalPages}>
            <i className="fas fa-long-arrow-alt-right"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Products;
