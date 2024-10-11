import { Notification, rem } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useState } from "react";

import classes from "./Notification.module.css";

export default function ShowSuccessAlert({
  title = "",
  detail = "",
  openAlert = false,
  setOpenAlert,
}: {
  title: string;
  detail?: string;
  openAlert: boolean;
  setOpenAlert: (open: boolean) => void;
}) {
  const [fadeOut, setFadeOut] = useState(false);

  const handleClose = () => {
    setFadeOut(true);
    setTimeout(() => setOpenAlert(false), 500);
    setTimeout(() => setFadeOut(false), 500);
  };
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

  return (
    openAlert && (
      <Notification
        icon={checkIcon}
        color="teal"
        title={title}
        onClose={handleClose}
        className={
          fadeOut
            ? `${classes.fadeOut} ${classes.notification}`
            : `${classes.notification}`
        }>
        {detail}
      </Notification>
    )
  );
}
