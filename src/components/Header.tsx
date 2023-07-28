import { useContext } from "react";
import { MyContext } from "../MyContext";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Header() {
  const { cartProds } = useContext(MyContext);

  return (
    <header className="p-5 flex flex-row shadow-md items-center justify-between">
      <span className="font-mono text-3xl font-bold">
        <Link to="/">Cotação Online</Link>
      </span>
      <div className="flex flex-row items-center">
        <AiOutlineShoppingCart className="w-5 h-5" />
        <span className="bg-gray-300 rounded-full text-sm text-black w-5 h-5 flex items-center justify-center">
          {cartProds.length > 0 ? cartProds.length : 0}
        </span>
      </div>
    </header>
  );
}
