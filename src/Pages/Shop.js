import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductContext from '../Context/ProductContext';
import './Shop.css';
import SideNavbar from '../Components/Navbar/SideNavbar';

const Shop = () => {
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

  const { category } = useContext(ProductContext);

  const chkFilter = product.filter((item) => {
    if (category === '' || category === 'ALL CATEGORIES') {
      return item;
    } else {
      return category.includes(item.category.toUpperCase());
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = chkFilter.slice(indexOfFirstItem, indexOfLastItem);

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
      <div className="shop">
        <SideNavbar />
        <aside>
          <section id="page-header" className="shop-header">
            <h2>#stayhome</h2>
            <p>Save more with coupons & up to 70% off!</p>
          </section>
          <section className="shop_des">
            <h2>Psilocybe Cubensis For Sale</h2>
            <p>
              We have assembled the very best shrooms for sale in on our
              shelves. These buy shrooms are from the different psilocybe
              species mentioned above and have been grown from our highly potent
              Psilocybe Spores for sale. Our Magic Mushroom Kits for sale,
              Psilocybe spore syringes for sale and Mushroom Grow Bags for sale
              are of the best quality there is to grow magic mushrooms. Our
              Shrooms for sale comprises of the various strong strains;
              Mazatapec Mushrooms for sale, Malabar Mushrooms for sale
            </p>
          </section>
          <div className="pro-container section-p1">
            {currentItems.map((item) => {
              const fileNameWithExtension = item.itemName;
              const fileNameWithoutExtension = removeFileExtension(
                fileNameWithExtension,
              );
              const fullPath = item.image;
              const fileName = removeDirectoryPath(fullPath);
              const mainPath = newPath + fileName;
              return (
                <Link key={item.id} to={`/products/${item.id}`} className="pro">
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
        </aside>
      </div>
      <div id="pagination" className="section-p1">
        <div>
          <button onClick={prevPage} disabled={currentPage === 1}>
            <i class="fas fa-long-arrow-alt-left"></i>
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
            <i class="fas fa-long-arrow-alt-right"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Shop;
