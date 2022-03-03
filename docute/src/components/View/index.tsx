import { useParams } from "react-router-dom";

import { useDocContent } from "@/utils/api";
import { useState, FC } from "react";

const RenderWithMarkDown:FC<{text: string}> = ({text}) => {
    console.log(text);

    return <h1>{text}</h1>
}

function View() {
  const { id } = useParams();
  const [text, setText] = useState<string>("");
  useDocContent(id!).then(([detail]) => {
    console.log(detail, "detail");
    setText(detail.content.text);
  });

  return <div>
      <RenderWithMarkDown text={text}/>
      </div>;
}

export default View;
