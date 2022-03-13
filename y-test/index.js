const Y = require("yjs");

// 第一个文档实例
const doc1 = new Y.Doc();
// 第二个文档实例
const doc2 = new Y.Doc();

// 文档的文本
const yText1 = doc1.getText();
const yText2 = doc2.getText();

// 在某份 YDoc 更新时，应用二进制的 update 数据到另一份 YDoc 上
doc1.on("update", (update) => {
  console.log("doc1 update", update);
  Y.applyUpdate(doc2, update);
});
doc2.on("update", (update) => Y.applyUpdate(doc1, update));

// 制造两次存在潜在冲突的更新
yText1.insert(0, "Edwards");
yText2.insert(0, "Wilson");

// CRDT 算法可保证两份客户端中的状态始终一致

let a = yText1.toJSON();
let b = yText2.toJSON();

console.log(a); // WilsonEdwards
console.log(b); // WilsonEdwards
