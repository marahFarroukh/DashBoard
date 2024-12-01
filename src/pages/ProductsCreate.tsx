import CreateForm from "../components/CreateForm";

function ProductsCreate() {
  return (
    <div className="right p-5 h-full w-full  bg-slate-100 dark:bg-slate-900">
      <div className={`top flex items-center`}>
        <h1
          className={`text-slate-950 text-2xl font-bold pb-[44px] dark:text-slate-50  `}
        >
          Create Products
        </h1>
      </div>
      <CreateForm />
    </div>
  );
}

export default ProductsCreate;
