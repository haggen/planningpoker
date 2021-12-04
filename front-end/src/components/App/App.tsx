import { Layout } from "src/components/Layout";
import { Header } from "src/components/Header";
import { Content } from "src/components/Content";
import { Deck } from "src/components/Deck";

import styles from "./App.module.css";

export const App = () => {
  return (
    <Layout>
      <Header />
      <Content />
      <Deck />
    </Layout>
  );
};
