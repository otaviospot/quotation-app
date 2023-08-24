import { useContext, useState } from "react";
import CartItem from "../components/CartItem";
import { MyContext } from "../MyContext";

export default function Cart() {
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");

  const { cartProds, handleRemoveFromCart, clearCart, handleCreateQuotation } =
    useContext(MyContext);

  const qtdProductsText = cartProds.length > 1 ? "produtos" : "produto";

  const stringCartProds = cartProds.map((prod: any, i: any) => {
    return `Produto${i}: ${prod.attributes?.name} <br>`;
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const dataQuotation = {
      clientName,
      email,
      stringCartProds: "teste",
    };
    handleCreateQuotation(dataQuotation);
  };

  return (
    <div className={`flex flex-0-auto flex-col bg-white p-5 w-full`}>
      <h2 className="text-xl font-bold text-red-700 mb-3 flex-grow-0">
        Carrinho{" "}
        <span className="text-sm">
          {cartProds.length > 0 &&
            " | " + cartProds.length + " " + qtdProductsText}
        </span>
      </h2>
      {cartProds.length > 0 ? (
        <form onSubmit={handleSubmit}>
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
          <div className="formCart flex flex-col">
            <label htmlFor="clientName">Nome do Cliente</label>
            <input
              type="text"
              name="clientName"
              id="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="cartBtnSection flex flex-col flex-grow-0">
            <button
              type="submit"
              className="rounded-md bg-red-500 text-white p-3 mt-2 hover:bg-red-900"
            >
              Enviar Pedido de Cotação
            </button>
            <button
              onClick={clearCart}
              className="rounded-md bg-gray-800 text-white p-3 mt-2 hover:bg-gray-600"
            >
              Limpar carrinho
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col flex-grow-0">
          <span className="text-gray-600">Seu carrinho está vazio</span>
        </div>
      )}
    </div>
  );
}
