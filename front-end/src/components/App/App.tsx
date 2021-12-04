import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { nanoid } from "nanoid";

import { Layout } from "src/components/Layout";
import { Header } from "src/components/Header";
import { Content } from "src/components/Content";
import { Deck } from "src/components/Deck";

import styles from "./App.module.css";

const createRoomId = () => {
  return nanoid(10);
};

export const App = () => {
  const [match, params] = useRoute("/:roomId");
  const [, setLocation] = useLocation();

  const { roomId } = params ?? {};

  useEffect(() => {
    if (!match) {
      setLocation("/" + createRoomId(), { replace: true });
    }
  }, [match, setLocation]);

  console.log({ roomId });

  return (
    <Layout>
      <Header />
      <Content />
      <Deck />
    </Layout>
  );
};
