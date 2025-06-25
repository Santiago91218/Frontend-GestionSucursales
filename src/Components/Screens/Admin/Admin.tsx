import styles from "./Admin.module.css";
import { HeaderAdmin } from "../../UI/HeaderAdmin/HeaderAdmin";
import { SliceBar } from "../../UI/SliceBar/SliceBar";
import { Outlet } from "react-router-dom";

export const Admin = () => {
  return (
    <div className={styles.mainDiv}>
      <HeaderAdmin></HeaderAdmin>
      <SliceBar></SliceBar>

      <div className={styles.containerOutlet}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};
