import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../axios";

const ProductElement = ({ id, title, image, rating, price, brandName }) => {
  const navigate = useNavigate();

  const isEditable = true;
  const product = {
    id, title, image, rating, price, brandName, amount: 1
  };

  const [showConfirmation, setShowConfirmation] = useState(false);

  

  const removeProduct = async () => {
    try {
      const response = await axios.delete(`/products/${id}`);
      toast.success('Продукт успешно удален:');
      return true;
      navigate("/");
    } catch (error) {
      toast.error('Ошибка при удалении продукта:', error);
      return false;
    }
  };


  const handleRemoveProduct = () => {
    setShowConfirmation(true);
  };

  const confirmRemoveProduct = () => {
    removeProduct();
    setShowConfirmation(false);
  };

  const cancelRemoveProduct = () => {
    setShowConfirmation(false); // Закрываем модальное окно без удаления
  };


  return (
    <div className="max-w-2xl">
      <div className="shadow-md rounded-lg max-w-sm bg-base-100">
        <Link to={`/shop/product/${id}`} onClick={() => window.scrollTo(0, 0)}>
          <img
            className="rounded-t-lg p-8"
            src={`${image}`}
            alt="product image"
          />
        </Link>
        <div className="px-5 pb-5">
          <Link to={`/shop/product/${id}`} onClick={() => window.scrollTo(0, 0)}>
            <h3 className="font-semibold text-xl tracking-tight mb-5 text-accent-content">
              {title}
            </h3>
          </Link>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-accent-content">&#x20bd;{price}</span>


          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductElement;
