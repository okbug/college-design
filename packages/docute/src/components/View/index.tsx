import { useParams, useNavigate } from "react-router-dom";

import { useDocContent } from "@/utils/api";
import { replaceHTMLClass } from "@/utils/common";
import { useState, FC } from "react";
import MD from "markdown-it";
import "./index.scss";
import { Button } from "@douyinfe/semi-ui";
import styles from './index.module.scss';

console.log(styles);

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
  const [haContent, setHasContent] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('加载中')
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>('');
  useDocContent(id!).then(([detail]) => {
    if (!detail) {
      setHasContent(false);
      setLoadingMessage('404');
      return;
    }
    setHasContent(true);
    setText(detail.content);
    setTitle(detail.title)
    document.title = `查看 - ${detail.title}`;
  }).catch(err => {
  })

  return (
    <>
    {
       haContent ? (<div>
        <Button type="primary" onClick={() => navigate(`/edit/${id}`)}>
          编辑
        </Button>
  
        <h1 className="title">{title}</h1>
        <RenderWithMarkDown text={text} />
      </div>) : <div>{loadingMessage === '404' ? <div className={styles.title}>
        <h1>404 Not Found</h1>
        <Button type="primary" onClick={() => {
          window.location.href = window.location.origin;
        }}>返回首页</Button>
      </div> : loadingMessage}</div>
    }
    </>
  );
}

export default View;
