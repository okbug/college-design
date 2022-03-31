import { useParams, useNavigate } from "react-router-dom";

import { useDocContent } from "@/utils/api";
import { replaceHTMLClass } from "@/utils/common";
import { useState, FC } from "react";
import MD from "markdown-it";
import "./index.scss";
import { Button } from "@douyinfe/semi-ui";

const md = MD();

const RenderWithMarkDown: FC<{ text: string }> = ({ text }) => {
  let html = md.render(text);
  let replacedHtml = replaceHTMLClass(html as string, "doc-title");
  console.log(replacedHtml);

  return (
    <>
      <div
        className="markdown-container"
        dangerouslySetInnerHTML={{
          __html: replacedHtml,
        }}
      ></div>
    </>
  );
};

function View() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>('');
  useDocContent(id!).then(([detail]) => {
    console.log(detail);
    setText(detail.content);
    setTitle(detail.title)
    document.title = `查看 - ${detail.title}`;
  });

  return (
    <div>
      <Button type="primary" onClick={() => navigate(`/edit/${id}`)}>
        编辑
      </Button>

      <h1 className="title">{title}</h1>
      <RenderWithMarkDown text={text} />
    </div>
  );
}

export default View;
