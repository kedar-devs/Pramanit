import Image from "next/image";

import Header from "../layout/Header";

import styles from "../styles/UserDashboard.module.css";

import settings from "../assets/svgs/settings.svg";
import applycertificate from "../assets/PRAMANIT/applycertificate.png";
import viewcertificate from "../assets/PRAMANIT/viewcertificate.png";

import Avatar from "@mui/material/Avatar";
import UserDashboardComponent from "../layout/UserDashboardComponent";

function user_certificate_view() {
  return (
    <div>
      <Header>
        <div className={styles.header_container}>
          <div className={styles.user_name_container}>
            <Avatar sx={{bgcolor: "#fff", color: "#930D0D"}}>H</Avatar>
            <h2 className={styles.user_name}>Hello World</h2>
          </div>
          <Image src={settings} width={30} height={30} />
        </div>
      </Header>
      <div className={styles.userdashboard_options}>
        <UserDashboardComponent
          image={applycertificate}
          title="Apply for certificate"
          href="/apply_certificate"
        />
        <UserDashboardComponent
          image={viewcertificate}
          title="View Certificate"
          href="/"
        />
      </div>
    </div>
  );
}

export default user_certificate_view;
