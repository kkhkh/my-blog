// import React, { useState, useRef, useEffect } from "react";
// import { chat } from "./Chat"; // chat.js のインポート

// const ChatGpt = () => {
//   // メッセージの状態管理用のステート
//   const [message, setMessage] = useState('');

//   // 回答の状態間利用のステート
//   const [answer, setAnswer] = useState('');

//   // 会話の記録用のステート
//   const [conversation, setConversation] = useState<any>([]);

//   // ローディング表示用のステート
//   const [loading, setLoading] = useState(false);

//   // 前回のメッセージの保持、比較用
//   const prevMessageRef = useRef('');

//   // メッセージの格納
//   const handleMessageChange = (event: any) => {
//     setMessage(event.target.value);
//   };

//   // 「質問」ボタンを押したときの処理
//   const handleSubmit = async (event: any) => {
//     event.preventDefault();

//     if (!message) {
//       return;
//     }

//     if (loading) return;

//     setLoading(true);

//     try{
// // chat.js にメッセージを渡して API から回答を取得
// const responseText = await chat(message);

// // 回答の格納
// setAnswer(responseText);
//     }catch(error){

//     }
//   };
//   // 回答が取得されたとき
//   useEffect(() => {
//     // 直前のチャット内容
//     const newConversation = [
//       {
//         'role': 'user',  // ユーザー
//         'content': message,  // 直前の質問内容
//       },
//       {
//         'role': 'assistant',  // ChatGPT
//         'content': answer,  // 直前の回答
//       },
//     ];

//     // 会話の記録(直前のチャット内容の追加)
//     setConversation([...conversation, ...newConversation]);

//     // メッセージの消去(フォームのクリア)
//     setMessage('');
//   }, [answer]);
//   // チャットフォームの表示
//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label>
//           <textarea
//             // rows="5"
//             // cols="50"
//             value={message}
//             onChange={handleMessageChange}
//           />
//         </label>
//         <div>
//           <button type="submit">質問する</button>
//         </div>
//       </form>
//       {answer && (
//         <div>
//           <h2>回答:</h2>
//           <p>{answer}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatGpt;
