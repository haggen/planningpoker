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
            <svg
              width="188"
              height="25"
              viewBox="0 0 188 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Planning poker"
            >
              <path d="M9.816 14.18V5.77998H6.216V14.18H9.816ZM9.192 19.34H0V18.428H1.056V5.01198H0V4.09998H8.448C10.096 4.09998 11.104 4.15598 11.472 4.26798C11.856 4.37998 12.224 4.49998 12.576 4.62798C12.928 4.75598 13.2 4.92398 13.392 5.13198C13.6 5.32398 13.816 5.57198 14.04 5.87598C14.28 6.16398 14.456 6.49998 14.568 6.88398C14.68 7.26798 14.776 7.72398 14.856 8.25198C14.936 8.76398 14.976 9.33998 14.976 9.97998C14.976 10.62 14.936 11.204 14.856 11.732C14.776 12.26 14.672 12.724 14.544 13.124C14.432 13.508 14.256 13.852 14.016 14.156C13.792 14.444 13.576 14.692 13.368 14.9C13.176 15.092 12.904 15.252 12.552 15.38C12.2 15.508 11.896 15.612 11.64 15.692C11.4 15.756 11.056 15.804 10.608 15.836C9.936 15.884 9.192 15.908 8.376 15.908H6.216V18.428H9.192V19.34Z" />
              <path d="M16.4147 1.84398H21.9347V18.428H22.8947V19.34H16.4147V18.428H17.3747V2.75598H16.4147V1.84398Z" />
              <path d="M26.0739 10.244L25.4979 6.49998C27.3059 6.01998 29.1219 5.77998 30.9459 5.77998C33.0099 5.77998 34.5059 6.09198 35.4339 6.71598C35.8179 6.95598 36.1379 7.30798 36.3939 7.77198C36.6499 8.21998 36.7779 8.75598 36.7779 9.37998V18.428H37.7379V19.34H34.7859L33.8259 17.516H33.5139C33.1939 18.444 32.8019 19.044 32.3379 19.316C31.8739 19.572 31.2259 19.7 30.3939 19.7C29.5779 19.7 29.0259 19.692 28.7379 19.676C28.4499 19.66 28.0579 19.62 27.5619 19.556C27.0659 19.492 26.6819 19.38 26.4099 19.22C26.1379 19.044 25.8499 18.812 25.5459 18.524C24.9859 17.996 24.7059 17.068 24.7059 15.74C24.7059 14.076 25.2259 12.972 26.2659 12.428C26.7779 12.172 27.2979 12.004 27.8259 11.924C28.3699 11.828 29.0259 11.78 29.7939 11.78H32.2179V7.57998H29.4819L28.8339 10.244H26.0739ZM32.2179 17.516V13.58H28.9299V17.516H32.2179Z" />
              <path d="M54.3499 19.34H48.8299V7.96398H45.3019V19.34H39.7819V18.428H40.7419V7.05198H39.7819V6.13998H42.9739L43.8139 7.96398H44.1259C44.4619 7.06798 44.9659 6.48398 45.6379 6.21198C46.3259 5.92398 47.3899 5.77998 48.8299 5.77998C50.2699 5.77998 51.3899 6.05198 52.1899 6.59598C52.9899 7.12398 53.3899 8.05198 53.3899 9.37998V18.428H54.3499V19.34Z" />
              <path d="M70.9671 19.34H65.4471V7.96398H61.9191V19.34H56.3991V18.428H57.3591V7.05198H56.3991V6.13998H59.5911L60.4311 7.96398H60.7431C61.0791 7.06798 61.5831 6.48398 62.2551 6.21198C62.9431 5.92398 64.0071 5.77998 65.4471 5.77998C66.8871 5.77998 68.0071 6.05198 68.8071 6.59598C69.6071 7.12398 70.0071 8.05198 70.0071 9.37998V18.428H70.9671V19.34Z" />
              <path d="M79.4963 19.34H73.0163V18.428H73.9762V7.05198H73.0163V6.13998H78.5362V18.428H79.4963V19.34ZM78.3203 1.31598C78.6083 1.53998 78.7523 2.09198 78.7523 2.97198C78.7523 3.85198 78.6083 4.40398 78.3203 4.62798C78.0323 4.85198 77.3603 4.96398 76.3043 4.96398C75.2483 4.96398 74.5522 4.85198 74.2162 4.62798C73.8962 4.40398 73.7363 3.85198 73.7363 2.97198C73.7363 2.09198 73.8962 1.53998 74.2162 1.31598C74.5522 1.09198 75.2483 0.97998 76.3043 0.97998C77.3603 0.97998 78.0323 1.09198 78.3203 1.31598Z" />
              <path d="M96.1155 19.34H90.5955V7.96398H87.0675V19.34H81.5475V18.428H82.5075V7.05198H81.5475V6.13998H84.7395L85.5795 7.96398H85.8915C86.2275 7.06798 86.7315 6.48398 87.4035 6.21198C88.0915 5.92398 89.1555 5.77998 90.5955 5.77998C92.0355 5.77998 93.1555 6.05198 93.9555 6.59598C94.7555 7.12398 95.1555 8.05198 95.1555 9.37998V18.428H96.1155V19.34Z" />
              <path d="M98.5967 23.228C98.1647 22.908 97.8847 22.532 97.7567 22.1C97.6287 21.684 97.5647 21.004 97.5647 20.06C97.5647 19.132 97.7647 18.42 98.1647 17.924C98.5647 17.412 99.0047 17.156 99.4847 17.156H101.285V16.844C100.469 16.684 100.061 16.18 100.061 15.332V13.844C98.6687 13.38 97.9727 12.284 97.9727 10.556V10.052C97.9727 8.62798 98.2287 7.62798 98.7407 7.05198C98.9327 6.82798 99.1087 6.65198 99.2687 6.52398C99.4287 6.37998 99.6527 6.25998 99.9407 6.16398C100.245 6.06798 100.493 5.99598 100.685 5.94798C100.893 5.89998 101.181 5.85998 101.549 5.82798C101.917 5.79598 102.205 5.77998 102.413 5.77998H103.373C104.477 5.77998 105.285 5.91598 105.797 6.18798C106.325 6.45998 106.589 6.97198 106.589 7.72398H106.901L107.141 6.73998C107.317 6.01998 107.533 5.53998 107.789 5.29998C108.045 5.05998 108.517 4.93998 109.205 4.93998H110.261V7.07598H109.997C109.693 7.07598 109.541 7.29998 109.541 7.74798V10.556C109.541 11.452 109.325 12.22 108.893 12.86C108.637 13.276 108.077 13.628 107.213 13.916C106.669 14.092 105.421 14.18 103.469 14.18H102.605V14.756C102.605 15.252 102.661 15.604 102.773 15.812C102.885 16.004 103.101 16.1 103.421 16.1H106.997C107.813 16.1 108.549 16.388 109.205 16.964C109.877 17.524 110.213 18.46 110.213 19.772C110.213 21.436 109.773 22.556 108.893 23.132C108.013 23.724 106.285 24.02 103.709 24.02C102.333 24.02 101.245 23.964 100.445 23.852C99.6447 23.756 99.0287 23.548 98.5967 23.228ZM105.413 12.212V7.72398H102.125V12.212H105.413ZM106.757 19.1H100.949V21.62H106.757V19.1Z" />
              <path d="M127.988 14.18V5.77998H124.388V14.18H127.988ZM127.364 19.34H118.172V18.428H119.228V5.01198H118.172V4.09998H126.62C128.268 4.09998 129.276 4.15598 129.644 4.26798C130.028 4.37998 130.396 4.49998 130.748 4.62798C131.1 4.75598 131.372 4.92398 131.564 5.13198C131.772 5.32398 131.988 5.57198 132.212 5.87598C132.452 6.16398 132.628 6.49998 132.74 6.88398C132.852 7.26798 132.948 7.72398 133.028 8.25198C133.108 8.76398 133.148 9.33998 133.148 9.97998C133.148 10.62 133.108 11.204 133.028 11.732C132.948 12.26 132.844 12.724 132.716 13.124C132.604 13.508 132.428 13.852 132.188 14.156C131.964 14.444 131.748 14.692 131.54 14.9C131.348 15.092 131.076 15.252 130.724 15.38C130.372 15.508 130.068 15.612 129.812 15.692C129.572 15.756 129.228 15.804 128.78 15.836C128.108 15.884 127.364 15.908 126.548 15.908H124.388V18.428H127.364V19.34Z" />
              <path d="M147.595 11.804V13.676C147.595 15.692 147.275 17.108 146.635 17.924C146.395 18.228 146.179 18.476 145.987 18.668C145.795 18.86 145.515 19.028 145.147 19.172C144.779 19.3 144.475 19.396 144.235 19.46C143.995 19.54 143.651 19.596 143.203 19.628C141.715 19.74 140.523 19.756 139.627 19.676C138.747 19.612 138.195 19.54 137.971 19.46C137.747 19.396 137.467 19.3 137.131 19.172C136.811 19.028 136.563 18.86 136.387 18.668C136.211 18.476 136.011 18.228 135.787 17.924C135.579 17.62 135.427 17.268 135.331 16.868C135.075 15.908 134.947 14.844 134.947 13.676V11.804C134.947 9.78798 135.267 8.37198 135.907 7.55598C136.147 7.25198 136.363 7.00398 136.555 6.81198C136.747 6.61998 137.027 6.45998 137.395 6.33198C137.763 6.18798 138.067 6.08398 138.307 6.01998C138.547 5.93998 138.899 5.88398 139.363 5.85198C140.035 5.80398 140.691 5.77998 141.331 5.77998C141.971 5.77998 142.403 5.78798 142.627 5.80398C142.867 5.80398 143.195 5.81998 143.611 5.85198C144.027 5.88398 144.347 5.93998 144.571 6.01998C144.795 6.08398 145.067 6.18798 145.387 6.33198C145.723 6.45998 145.979 6.61998 146.155 6.81198C146.331 7.00398 146.523 7.25198 146.731 7.55598C146.955 7.85998 147.123 8.21198 147.235 8.61198C147.475 9.57198 147.595 10.636 147.595 11.804ZM143.035 17.9V7.57998H139.507V17.9H143.035Z" />
              <path d="M155.526 19.34H150.006V18.428H150.966V2.75598H150.006V1.84398H156.174V5.41998L155.718 5.58798C155.446 5.68398 155.27 5.77998 155.19 5.87598C155.126 5.95598 155.094 6.09998 155.094 6.30798V10.724H155.526C156.054 8.93198 156.638 7.68398 157.278 6.97998C157.918 6.27598 158.774 5.92398 159.846 5.92398C160.918 5.92398 161.75 5.98798 162.342 6.11598L161.862 9.88398H158.934V11.156C158.934 11.348 158.974 11.492 159.054 11.588C159.166 11.716 159.366 11.78 159.654 11.78H161.694L163.278 18.428H164.214V19.34H158.43L157.278 12.908H155.526V19.34Z" />
              <path d="M170.444 7.57998V11.9H173.732V7.57998H170.444ZM170.444 17.9H173.444L174.068 15.236H176.636L177.188 18.98C175.3 19.46 173.5 19.7 171.788 19.7C171.132 19.7 170.572 19.676 170.108 19.628C169.644 19.596 169.124 19.492 168.548 19.316C167.972 19.124 167.508 18.868 167.156 18.548C166.804 18.212 166.5 17.74 166.244 17.132C166.004 16.508 165.884 15.772 165.884 14.924V11.804C165.884 9.80398 166.204 8.38798 166.844 7.55598C167.068 7.25198 167.276 7.00398 167.468 6.81198C167.676 6.61998 167.956 6.45998 168.308 6.33198C168.66 6.18798 168.956 6.08398 169.196 6.01998C169.436 5.93998 169.78 5.88398 170.228 5.85198C170.9 5.80398 171.556 5.77998 172.196 5.77998C172.836 5.77998 173.284 5.78798 173.54 5.80398C173.796 5.80398 174.14 5.82798 174.572 5.87598C175.004 5.92398 175.324 5.99598 175.532 6.09198C175.756 6.18798 176.012 6.33198 176.3 6.52398C176.604 6.71598 176.82 6.94798 176.948 7.21998C177.092 7.49198 177.212 7.84398 177.308 8.27598C177.42 8.69198 177.476 9.17998 177.476 9.73998C177.476 10.3 177.42 10.796 177.308 11.228C177.212 11.644 177.092 11.988 176.948 12.26C176.82 12.532 176.604 12.764 176.3 12.956C176.012 13.148 175.756 13.292 175.532 13.388C175.324 13.484 175.004 13.556 174.572 13.604C173.996 13.668 173.268 13.7 172.388 13.7H170.444V17.9Z" />
              <path
                d="M179.751 6.13998H182.655L183.135 7.96398H183.327C183.599 7.16398 183.951 6.60398 184.383 6.28398C184.831 5.94798 185.343 5.77998 185.919 5.77998C186.495 5.77998 187.055 5.82798 187.599 5.92398L187.095 9.88398H183.687V11.156C183.687 11.348 183.727 11.492 183.807 11.588C183.919 11.716 184.119 11.78 184.407 11.78H185.271V18.428H187.215V19.34H179.751V18.428H180.711V7.05198H179.751V6.13998Z"
                fill="white"
              />
            </svg>
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
