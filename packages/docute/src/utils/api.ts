import { useContext } from "react";
import context from "@/utils/context";

export const useDocContent = (id: string) => {
  const { event } = useContext(context);
  return Promise.all(
    event.emit("post", "getDocDetail", {
      id,
    })
  );
};

export const useUpdateUserFavorite = (userName, id, state) => {
  const { event } = useContext(context);

  return Promise.all(
    event.emit("post", "/changeUserFavorite", {
      userName,
      id,
      options: state ? "add" : "false",
    })
  );
};
