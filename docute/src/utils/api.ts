import { useContext } from "react";
import context from "@/utils/context";

export const useDocContent = (id: string) => {
  const {event} = useContext(context);
  return Promise.all(
    event.emit("post", "getDocDetail", {
      id,
    })
  );
};
