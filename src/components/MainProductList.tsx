export default function MainProductList({ children }: any) {
  return (
    <div className="mainContainer pr-80 flex flex-row items-start flex-wrap p-5 pb-14 flex-auto min-h-100v-h">
      {children}
    </div>
  );
}
