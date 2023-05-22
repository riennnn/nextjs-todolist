import { Button } from "@chakra-ui/react";

const Todoshow = () => {

  return (
    <>
    <div>
      <h2>タイトル</h2>
      <p>詳細内容</p>
      <p>ステータス</p>
      <Button>削除</Button>
      <Button>編集</Button>
      <h2>コメント</h2>
      <textarea placeholder="Text"></textarea>
      <button>保存</button>
    </div>
    </>
  );
}

export default Todoshow;