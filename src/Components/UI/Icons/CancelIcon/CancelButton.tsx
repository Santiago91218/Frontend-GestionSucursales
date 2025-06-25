import { FC } from "react";
import styles from "./CancelButton.module.css";

interface CancelButtonProps {
  onClick: () => void;
}

export const CancelButton: FC<CancelButtonProps> = ({ onClick }) => {
  return (
    <span
      onClick={onClick}
      className={`material-symbols-outlined ${styles.customIcon}`}
    >
      cancel
    </span>
  );
};
