import { useParams, useNavigate } from "react-router-dom";

import { useDocContent, useUpdateUserFavorite } from "@/utils/api";
import { replaceHTMLClass } from "@/utils/common";
import { useState, FC } from "react";
import MD from "markdown-it";
import "./index.scss";
import { Button, Toast, Modal, Select } from "@douyinfe/semi-ui";
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
  const [limit, setLimit] = useState(0);
  useDocContent(id!).then(([detail]) => {
    console.log(detail, 'doc detail')
    if (!detail) {
      setHasContent(false);
      setLoadingMessage('404');
      return;
    }
    const limits = detail;
    const name = window.localStorage.getItem('username')
    // 仅文档拥有者可见
    if (limits === 3 && detail.view_users[0].name !== name) {
      Toast.error('没有权限');
      window.location.href = 'http://localhost:9000';
      return;
    }
    // limits = 2 说明阅读需要权限
    // 有权限 但是不在权限中
    if (limits === 2 && detail.view_users.every(user => user.name !== name)) {
      Toast.error('没有权限');
      window.location.href = 'http://localhost:9000';
      return;
    }

    // 
    setHasContent(true);
    setText(detail.content);
    setTitle(detail.title)
    document.title = `查看 - ${detail.title}`;
  }).catch(err => {
  })
  const [privateModal, setPrivate] = useState<boolean>(false);

  return (
    <>
    {
       haContent ? (<div>
         <Modal
          title={'设置文档权限'}
          visible={privateModal}
          onOk={() => setPrivate(false)}
          onCancel={() => setPrivate(false)}
         >
           <Select defaultValue={limit} onChange={(value) => setLimit(Number(value))}>
             <Select.Option value={0}>都可以查看</Select.Option>
             <Select.Option value={1}>有权限可以查看</Select.Option>
             <Select.Option value={2}>仅作者可以查看</Select.Option>
           </Select>
         </Modal>
         <Button  style={{margin:'0 60px 0 30px'}} onClick={() => {setPrivate(true)}}>设置权限</Button>
        <Button style={{margin:'0 0 0 30px'}} type="primary" onClick={() => navigate(`/edit/${id}`)}>
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
