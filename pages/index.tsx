import type { NextPage } from "next";
import Header from "@/components/Header";
import ProductDataGrid from "@/components/ProductDataGrid";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <ProductDataGrid />
    </>
  );
};

export default Home;
