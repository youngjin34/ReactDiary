import React, { useContext, useRef, useState } from "react"
import { DiaryDispatchContext } from "./App";


const DiaryEditor = () => {

  const { onCreate } = useContext(DiaryDispatchContext);

  const titleInput = useRef();
  const authorInput = useRef();
  const contentInput = useRef();

  const [state, setState] = useState({
    title: "",
    author: "",
    content: "",
    emotion: 1,
  })

  const handleChangeState = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);

    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (state.title.length < 3) {
      alert("제목은 3 글자 이상 입력해주세요.")
      titleInput.current.focus();
      return;
    }

    if (state.author.length < 2) {
      alert("작성자는 2 글자 이상 입력해주세요");
      authorInput.current.focus();
      return;
    }

    if (state.content.length < 5) {
      alert("일기 본문은 5 글자 이상 입력해주세요");
      contentInput.current.focus()
      return;
    }
    onCreate(state.title, state.author, state.content, state.emotion);
    alert("저장 성공");
    setState({
      title: "",
      author: "",
      content: "",
      emotion: 1,
    })
  };


  return <div className="DiaryEditor">
    <h2>오늘의 일기</h2>
    <div>
      <input
        ref={titleInput}
        name="title"
        placeholder="제목"
        value={state.title}
        onChange={handleChangeState}
      />
    </div>
    <div>
      <input
        ref={authorInput}
        name="author"
        placeholder="작성자"
        value={state.author}
        onChange={handleChangeState}
      // onChange={(e) => {
      //   console.log(e.target.value);
      //   setState({
      //     ...state,
      //     author: e.target.value, //author가 위에 있으면 기존에 author값이 새로운 state에 author를 덮어 씌워 결과적으로는 업데이트 된 것이 없게 된다.
      //   });
      // }} 
      />
    </div>
    <div>
      <textarea
        ref={contentInput}
        name="content"
        placeholder="일기 내용을 적어주세요!"
        value={state.content}
        onChange={handleChangeState}
      // onChange={(e) => {
      //   setState({
      //     ...state,
      //     content: e.target.value,
      //   });
      // }} 
      />
    </div>
    <div>
      <span>오늘의 감정 점수 : </span>
      <select
        name="emotion" value={state.emotion}
        onChange={handleChangeState}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
    </div>
    <div>
      <button onClick={handleSubmit}>일기 저장하기</button>
    </div>
  </div>
}

// DiaryEditor가 길어서 memo가 불편하니 내보내는 DiaryEditor에서 React.memo를 해도 된다.
export default React.memo(DiaryEditor);