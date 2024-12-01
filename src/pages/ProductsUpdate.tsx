import CreateForm from "../components/CreateForm";

function ProductsUpdate() {
  return (
    <>
      <div className="right p-5 w-full h-full  bg-slate-100 dark:bg-slate-900">
        <div className={`top flex items-center`}>
          <h1
            className={`text-slate-950 text-2xl font-bold pb-[44px] dark:text-slate-50  `}
          >
            Update Products
          </h1>
        </div>
        <CreateForm type="update" />
      </div>
    </>
  );
}

export default ProductsUpdate;
