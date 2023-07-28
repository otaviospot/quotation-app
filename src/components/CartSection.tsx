import { useContext } from 'react';
import CartItem from './CartItem';
import { MyContext } from '../MyContext';

export default function CartSection() {
  const { cartProds, handleRemoveFromCart, clearCart } = useContext(MyContext);
  const qtdProductsText = cartProds.length > 1 ? 'produtos' : 'produto';

  return (
    <div className="flex flex-col p-5 w-80 border-l border-solid border-gray-400">
      <h2 className="text-xl font-bold text-blue-700 mb-3 flex-grow-0">
        Carrinho{' '}
        <span className="text-sm">
          {cartProds.length > 0 &&
            ' | ' + cartProds.length + ' ' + qtdProductsText}
        </span>
      </h2>
      {cartProds.length > 0 ? (
        <>
          <div className="flex flex-col gap-3 flex-grow">
            {cartProds.map((cartItem: any) => (
              <CartItem
                key={cartItem.id}
                name={cartItem.attributes?.name}
                id={cartItem.id}
                handleRemoveFromCart={handleRemoveFromCart}
              />
            ))}
          </div>

          <div className="cartBtnSection flex flex-col flex-grow-0">
            <button className="rounded-md bg-red-500 text-white p-3 mt-2 hover:bg-red-900">
              Enviar Pedido de Cotação
            </button>
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
