import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import { ProductType } from "../../types/ProductType";
import { RootState } from "../../redux/store";

export default function ProductBlock({ title, price, id, imageUrl, types, sizes }: ProductType) {
  const dispatch = useDispatch();
  const typeNames: string[] = ["оригинальный", "острый"];

  const cartItem: ProductType | undefined = useSelector(
    (state: RootState) =>
      state.cart.items.find((obj: ProductType) => obj.id === id) as ProductType | undefined
  );

  const addedCount: number | undefined = cartItem && "count" in cartItem ? cartItem.count : 0;

  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const addOnClick = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      size: sizes && sizes[activeSize],
      type: typeNames[activeType],
    };
    dispatch(addItem(item));
  };

  return (
    <div className="product-block">
      <Link to={`product/${id}`}>
        <img className="product-block__image" src={imageUrl} alt="Soup" />
        <h4 className="product-block__title">{title ? title : "Суп"}</h4>
      </Link>
      <div className="product-block__selector">
        <ul>
          {types && types.map((type, index) => (
            <li
              key={type}
              onClick={() => setActiveType(index)}
              className={activeType === index ? "active" : ""}>
              {typeNames[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes && sizes.map((size, index) => (
            <li
              key={index}
              onClick={() => setActiveSize(index)}
              className={activeSize === index ? "active" : ""}>
              {size} мл.
            </li>
          ))}
        </ul>
      </div>
      <div className="product-block__bottom">
        <div className="product-block__price">от {price} ₽</div>
        <button className="button button--outline button--add" onClick={addOnClick}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span></span>
          {addedCount && addedCount !== 0 ? <i>{addedCount}</i> : null}
          {/* {addedCount && addedCount !== 0 && <i>{addedCount}</i>} */}
        </button>
      </div>
    </div>
  );
}
