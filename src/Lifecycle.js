import React, { useEffect, useState } from "react";

const Lifecycle = () => {

  // const [count, setCount] = useState(0);
  // const [text, setText] = useState("");

  // useEffect(() => {
  //   console.log("Update!");
  // }); // conponent가 업데이트 되는 순간마다 실행되고 싶으면 두번째 인자([])를 뺴준다.

  // useEffect(() => {
  //   console.log(`count is update : ${count}`);
  // }, [count]); // depandency array이를 활용하면 감지하고 싶은 값만 인지해서 그 값이 변하는 순간에만 해당 callback함수가 실행된다.

  const UnmountTest = () => {
    useEffect(() => {
      console.log("Mount!");

      return () => {
        // Unmount 시점에 실행되게 됨
        console.log("Unmount!");
      }
    }, [])

    return <div>Unmount Testing Component</div>
  }

  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  return <div style={{ padding: 20 }}>
    <button onClick={toggle}>ON/OFF</button>
    {isVisible && <UnmountTest />}
  </div>
};

export default Lifecycle;