import React, { useContext, useState } from 'react';
import './SideNavbar.css';
import ProductContext from '../../Context/ProductContext';

const SideNavbar = () => {
  const { category, setIsCategory } = useContext(ProductContext);

  const [open, setOpen] = useState(false);

  const toggle_sidebar = () => {
    if (!open) {
      setOpen(true);
    }
    if (open) {
      setOpen(false);
    }
  };

  const categories = [
    'ALL CATEGORIES',
    'IBOGAINE',
    'SHROOM EDIBLES',
    'MAGIC MUSHROOM SPORES',
    'MUSHROOM GROW BAGS',
    'DMT',
    'LSD',
    'AYAHUASCA',
    'KETAMINE',
    'MDMA',
    'PEYOTE',
    'SHROOMS',
    'MAGIC-TRUFFLES',
    'MICRODOSE SHROOMS',
  ];
  const renderCategory = (e) => {
    setIsCategory(e.target.innerText);
  };
  const categorys = categories.map((cat) => {
    return (
      <li key={Math.random().toString()} onClick={renderCategory}>
        <span className={cat === category ? 'active' : ''}>{cat}</span>
      </li>
    );
  });
  return (
    <section id="sideHeader" className={open === true ? 'active' : ''}>
      <div>
        <ul id="sideNavbar" className={open === true ? 'active' : ''}>
          <span
            className={`close_cat ${open === true ? 'rotate' : ''}`}
            onClick={() => toggle_sidebar()}
          >
            <i className="fas fa-arrow-right"></i>
          </span>
          {categorys}
        </ul>
      </div>
    </section>
  );
};

export default SideNavbar;
