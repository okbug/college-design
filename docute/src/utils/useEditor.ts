import { useEffect } from "react";
import Vditor from "vditor";

interface EditorOptions {
  options: IOptions;
  bindFn: (vditor: any) => void;
  // 默认文字
  defaultText?: string;
}
export const useEditor = (config: EditorOptions) => {
  useEffect(() => {
    const vditor = new Vditor("editor", {
      toolbarConfig: {
        pin: true,
      },
      cache: {
        enable: false,
      },
      after() {
        if (!config.defaultText) {
          return;
        }
        vditor.setValue(config.defaultText);
      },
      placeholder: 'hahah',
      ...config.options,
    });

    typeof config.bindFn === 'function' && config.bindFn(vditor);
  }, []);
};
