import {
  FocusEvent,
  FormEvent,
  KeyboardEvent,
  ReactNode,
  useState,
} from "react";

import * as classes from "./style.module.css";

import { Flex } from "~/src/components/Flex";
import { usePlayers } from "~/src/lib/data";

function Profile() {
  const [editing, setEditing] = useState(false);
  const { clientId, players, setName } = usePlayers();
  const { name = "" } = players[clientId] ?? {};

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputs = e.currentTarget.elements as unknown as {
      name: HTMLInputElement;
    };

    setName(inputs.name.value);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Escape":
        handleCancel();
        break;
      default:
        return;
    }
    e.preventDefault();
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.currentTarget.select();
  };

  if (editing) {
    return (
      <Flex as="form" gap=".5rem" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          defaultValue={name}
          placeholder="Anonymous"
          aria-label="Your name"
          onKeyDown={handleKeyDown}
          onBlur={handleCancel}
          onFocus={handleFocus}
          autoComplete="off"
          maxLength={24}
          style={{
            fontWeight: "bolder",
            textAlign: "right",
          }}
          required
          autoFocus
        />
      </Flex>
    );
  }

  const handleEdit = () => {
    setEditing(true);
  };

  return (
    <button
      onClick={handleEdit}
      title="Edit profile"
      aria-label="Edit profile"
      style={{
        cursor: "pointer",
        fontWeight: "bolder",
      }}
    >
      {name}
    </button>
  );
}

type Props = {
  children: ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <div className={classes.layout}>
      <Flex as="header" justify="space-between" className={classes.topbar}>
        <h1>
          <a href="/" target="_blank">
            Planning poker
          </a>
        </h1>

        <Profile />
      </Flex>

      <main className={classes.main}>{children}</main>

      <Flex as="footer" justify="center" className={classes.footer}>
        <p>
          Made by{" "}
          <a href="https://twitter.com/haggen" target="_blank" rel="noreferrer">
            me
          </a>
          . Source and feedback on{" "}
          <a
            href="https://github.com/haggen/planningpoker"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          .
        </p>
      </Flex>
    </div>
  );
}
