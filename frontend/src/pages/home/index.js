import { useCallback, useEffect, useState } from "react";
import { get } from "../../api/home";
import Layout from "../../layout/layout";

const Home = () => {
  const [a, setA] = useState();
  const getData = useCallback(async () => {
    const b = await get();
    setA(b?.data);
  });

  useEffect(() => {
    getData();
  });

  return (
    <Layout>
      <div>{a}</div>
    </Layout>
  );
};

export default Home;
