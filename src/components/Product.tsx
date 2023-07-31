import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from '../MyContext';

interface IProduct {
  key: any;
  name: string;
  price: number;
  promotionalPrice: number;
  image?: string;
  id: any;
  handleAddToCart?: any;
  showPrice?: boolean;
}

export default function Product({
  name,
  price,
  promotionalPrice,
  image,
  id,
  handleAddToCart,
  showPrice = true,
}: IProduct) {
  const discount = (
    ((price - promotionalPrice) / promotionalPrice) *
    100
  ).toFixed(0);

  const { setOpenCart, realBr } = useContext(MyContext);

  return (
    <div className={`productItem w-1/4 h-96 relative flex p-2.5`}>
      <div className="productItemContainer w-full relative justify-between self-stretch flex flex-col items-center p-5 border border-solid border-gray-400 rounded-md hover:shadow-xl hover:border-red-400">
        <div className="discountTag bg-red-500 text-white text-sm rounded-md p-1 px-2 absolute top-1 right-1">
          {discount}% OFF
        </div>
        <div className="flex flex-col items-center">
          <div className="producThumb">
            <img src={`http://localhost:1337${image}`} alt={name} />
          </div>
          <h3>
            <Link onClick={() => setOpenCart(false)} to={`products/${id}`}>
              {name}
            </Link>
          </h3>
          {showPrice && (
            <div className="productPrice flex flex-col">
              <span className="price text-sm text-center text-gray-600 line-through">
                {realBr.format(price)}
              </span>
              <span className="promotionPrice font-bold text-xl">
                {realBr.format(promotionalPrice)}
              </span>
            </div>
          )}
        </div>
        <button
          className="rounded-md bg-red-500 text-white p-3 mt-2 hover:bg-red-900"
          onClick={() => handleAddToCart(id)}
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}
