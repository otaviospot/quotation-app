import { Link } from "react-router-dom";

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
  const RealBr = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const discount = (
    ((price - promotionalPrice) / promotionalPrice) *
    100
  ).toFixed(0);

  return (
    <div
      className={`relative productItem flex flex-col justify-center items-center p-8 border border-solid border-gray-400 rounded-md hover:shadow-xl hover:border-red-400`}
    >
      <div className="discountTag bg-red-500 text-white text-sm rounded-md p-1 px-2 absolute top-1 right-1">
        {discount}% OFF
      </div>
      <div className="producThumb">
        <img src={`http://localhost:1337${image}`} alt={name} />
      </div>
      <h3>
        <Link to={`products/${id}`}>{name}</Link>
      </h3>
      {showPrice && (
        <div className="productPrice flex flex-col">
          <span className="price text-sm text-center text-gray-600 line-through">
            {RealBr.format(price)}
          </span>
          <span className="promotionPrice font-bold text-xl">
            {RealBr.format(promotionalPrice)}
          </span>
        </div>
      )}
      <button
        className="rounded-md bg-red-500 text-white p-3 mt-2 hover:bg-red-900"
        onClick={() => handleAddToCart(id)}
      >
        Adicionar ao carrinho
      </button>
    </div>
  );
}
