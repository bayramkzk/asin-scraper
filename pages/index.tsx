import Header from "@/components/Header";
import ProductDataGrid from "@/components/ProductDataGrid";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <ProductDataGrid />
    </>
  );
};

export default Home;
