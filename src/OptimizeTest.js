import React, { useEffect, useState } from "react";



// props인 text가 변하지 않는 이상 rendring이 발생하지 않는다.
// const TextView = React.memo(({ text }) => {
//   useEffect(() => {
//     console.log(text);
//   });
//   return <div>{text}</div>
// });

// const CountView = React.memo(({ count }) => {
//   useEffect(() => {
//     console.log(count);
//   });
//   return <div>{count}</div>
// });

const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(count);
  });
  return <div>{count}</div>
});
const CounterB = ({ obj }) => {
  useEffect(() => {
    console.log(obj.count);
  })
  return <div>{obj.count}</div>
}

const aerEqual = (prevProps, nextProps) => {
  // return true // prevProps, nextProps가 같다 -> 리렌더링을 일으키지 않는다.
  // return false // prevProps, nextProps가 다르다 -> 리렌더링을 일으킨다.
  if (prevProps.obj.count === nextProps.obj.count) {
    return true;
  }
  return false;
}
const MemoizedCounterB = React.memo(CounterB, aerEqual);

const OptimizeTest = () => {

  // const [count, setCount] = useState(1);
  // const [text, setText] = useState("");

  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  })


  return <div style={{ padding: 50 }}>
    {/* <div>
      <h2>count</h2>
      <CountView count={count} />
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
    <div>
      <h2>text</h2>
      <TextView text={text} />
      <input value={text} onChange={(e) => setText(e.target.value)} />
    </div> */}
    <div>
      <h2>Counter A</h2>
      <CounterA count={count} />
      <button onClick={() => setCount(1)}>A button</button>
    </div>
    <div>
      <h2>Counter B</h2>
      <MemoizedCounterB obj={obj} />
      <button onClick={() => setObj({
        count: obj.count
      })}>B Button</button>
    </div>
  </div>
};

export default OptimizeTest;