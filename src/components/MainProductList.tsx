export default function MainProductList({ children }: any) {
  return (
    <div className="mainContainer flex flex-row flex-wrap p-5 gap-2.5 flex-grow">
      {children}
    </div>
  );
}
