import { useContext } from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { MyContext } from "../MyContext";
import { AiOutlineClose } from "react-icons/ai";

export default function CartSection({
  floatingCart = false,
}: {
  floatingCart?: boolean;
}) {
  const {
    cartProds,
    handleRemoveFromCart,
    clearCart,
    openCart,
    handleOpenCart,
  } = useContext(MyContext);
  const qtdProductsText = cartProds.length > 1 ? "produtos" : "produto";
  const openCartCss = openCart ? "translate-x-0" : "translate-x-full";
  const floatingCss = floatingCart
    ? `fixed right-0 top-0 transition-transform z-20 h-full ${openCartCss}`
    : "h-100v-h fixed right-0 ";

  return (
    <div
      className={`flex flex-0-auto flex-col bg-white p-5 w-80 border-l border-solid border-gray-400 ${floatingCss}`}
    >
      <h2 className="text-xl font-bold text-red-700 mb-3 flex-grow-0">
        Carrinho{" "}
        <span className="text-sm">
          {cartProds.length > 0 &&
            " | " + cartProds.length + " " + qtdProductsText}
        </span>
      </h2>
      {floatingCart && (
        <button onClick={handleOpenCart} className="absolute top-3 right-3">
          <AiOutlineClose className="w-5 h-5" />
        </button>
      )}

      {cartProds.length > 0 ? (
        <>
          <div className="flex flex-col gap-3 flex-grow">
            {cartProds.map((cartItem: any) => (
              <CartItem
                key={cartItem.id}
                name={cartItem.attributes?.name}
                id={cartItem.id}
                image={
                  cartItem.attributes?.defaultImage?.data?.attributes?.formats
                    ?.thumbnail?.url
                }
                handleRemoveFromCart={handleRemoveFromCart}
              />
            ))}
          </div>

          <div className="cartBtnSection flex flex-col flex-grow-0">
            <Link
              className="flex justify-center items-center rounded-md bg-red-500 text-white p-3 mt-2 hover:bg-red-900"
              to={`cart`}
            >
              Enviar Pedido de Cotação
            </Link>
            <button
              onClick={clearCart}
              className="rounded-md bg-gray-800 text-white p-3 mt-2 hover:bg-gray-600"
            >
              Limpar carrinho
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col flex-grow-0">
          <span className="text-gray-600">Seu carrinho está vazio</span>
        </div>
      )}
    </div>
  );
}
