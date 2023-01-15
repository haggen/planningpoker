import { useLocation, useRoute } from "wouter";

import { Layout } from "~/src/components/Layout";
import { Provider } from "~/src/lib/yjs";
import { Game } from "~/src/components/Game";
import { createId } from "~/src/lib/data";

type Params = {
  gameId: string;
};

export function App() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute<Params>("/:gameId");

  if (!match) {
    setLocation(`/${createId()}`, { replace: true });
  }

  if (!params) {
    return null;
  }

  return (
    <Provider roomId={params.gameId}>
      <Layout>
        <Game />
      </Layout>
    </Provider>
  );
}
