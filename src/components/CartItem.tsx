import { AiOutlineCloseCircle } from "react-icons/ai";

interface ICartItem {
  name: string;
  id: any;
  handleRemoveFromCart?: any;
}

export default function CartItem({
  id,
  name,
  handleRemoveFromCart,
}: ICartItem) {
  return (
    <div className="flex items-center justify-between p-2 border border-solid border-gray-400 rounded-md">
      <span>{name}</span>
      <button onClick={() => handleRemoveFromCart(id)}>
        <AiOutlineCloseCircle />
      </button>
    </div>
  );
}
