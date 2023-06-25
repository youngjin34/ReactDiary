import React, {
  useRef, useEffect, useMemo, useCallback, useReducer
} from 'react';


import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      return action.data
    }
    case 'CREATE':
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date
      }
      return [newItem, ...state]
    case 'REMOVE':
      return state.filter((it) => it.id !== action.targetId);
    case 'EDIT':
      return state.map((it) =>
        it.id === action.targetId ?
          { ...it, content: action.newContent } : it);
    default:
      return state;
  }
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/posts'
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        title: `${it.id}번 째 애가 씀`,
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      }
    });

    dispatch({ type: "INIT", data: initData })
  };

  useEffect(() => {
    getData();
  }, [])

  const onCreate = useCallback((title, author, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: { title, author, content, emotion, id: dataId.current }
    });
    dataId.current += 1;
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", newContent })
  }, []);

  const memoziedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit }
  }, []);

  // useMemo()에 return 값을 기억, 두 번째 인자인 배열이 변할 때만 첫 번째 인자인 콜백함수가 다시 실행
  // data.lengh가 변하지 않는 이상 똑같은 값을 반환
  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio }
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis; // useMemo()가 함수로 사용되고 getDiaryAnalysis는값을 저장한 상수,  따라서 함수로 선언하면 안됨

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoziedDispatches}>
        <div className='App'>
          <DiaryEditor />
          <div>전체 일기 : {data.length}</div>
          <div>기분 좋은 일기 개수 : {goodCount}</div>
          <div>기분 나쁜 일기 개수 : {badCount}</div>
          <div>기분 좋은 일기 비율 : {goodRatio}</div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
};

export default App;
