import { useEffect } from "react";
import Vditor from "vditor";

export const useEditor = (config: IOptions) => {
  useEffect(() => {
    const vditor = new Vditor("editor", {
        toolbarConfig: {
          pin: true,
        },
        cache: {
          enable: false,
        },
        after() {
            vditor.setValue("Hello, Vditor + React!");
        },
        ...config,
      });
  });
};
