import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnswer, getLanguages } from "../redux/actions";

import Select from "react-select";
import { clearAnswer } from "../redux/translateSlice";

const MainPage = () => {
  const dispatch = useDispatch();

  const store = useSelector((store) => store);

  const [text, setText] = useState("");

  const areaRef = useRef();

  const [sourceLang, setSourceLang] = useState({
    value: "tr",
    label: "Turkish",
  });
  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  });

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  const handleClick = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    dispatch(clearAnswer());
    areaRef.current.value = "";
  };

  return (
    <>
      <h1>Çeviri +</h1>
      <div className="container">
        <div className="left">
          <Select
            value={sourceLang}
            className="select"
            options={store.languages}
            onChange={(e) => setSourceLang(e)}
          />
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            onChange={(e) => setText(e.target.value)}
            ref={areaRef}
          ></textarea>
        </div>
        <button className="change-btn" onClick={handleClick}>
          Değiş
        </button>
        <div className="right">
          <Select
            value={targetLang}
            className="select"
            options={store.languages}
            onChange={(e) => setTargetLang(e)}
          />
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            value={store.answer}
            disabled
          ></textarea>
        </div>
      </div>
      <button
        onClick={() => dispatch(getAnswer({ text, sourceLang, targetLang }))}
      >
        Çevir
      </button>
    </>
  );
};

export default MainPage;
