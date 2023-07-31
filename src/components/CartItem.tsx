import { AiOutlineCloseCircle } from 'react-icons/ai';

interface ICartItem {
  name: string;
  id: any;
  image?: string;
  handleRemoveFromCart?: any;
}

export default function CartItem({
  id,
  name,
  image,
  handleRemoveFromCart,
}: ICartItem) {
  return (
    <div className="flex items-center justify-between p-2 border border-solid border-gray-400 rounded-md">
      <div className="">
        <img
          className="w-10"
          src={`http://localhost:1337${image}`}
          alt={name}
        />
      </div>
      <span className="flex-grow px-5">{name}</span>
      <button onClick={() => handleRemoveFromCart(id)}>
        <AiOutlineCloseCircle />
      </button>
    </div>
  );
}
