import React, { useEffect, useState } from "react";
import { WriteInputContainer } from "./ui/WriteInput";
import styled from "styled-components";
import { SelectBox } from "./ui/SelectBox";
import { DatePick } from "./DatePick";
import CheckBox from "./CheckBox";
import { ButtonPrimary } from "./ui/Button";

import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import uuid from "react-uuid";

const devTypeOptions = [
  { value: "frontend", name: "프론트엔드" },
  { value: "backend", name: "백엔드" },
];

const onOffOptions = [
  { value: "on", name: "온라인" },
  { value: "off", name: "오프라인" },
];

const WriteStudy = () => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [devType, setDevType] = useState("frontend");
  const [devStack, setDevStack] = useState([]);
  const [totalHeadCount, setTotalHeadCount] = useState(0);
  const [onOff, setOnOff] = useState("on");
  const [content, setContent] = useState("");
  const dateCreated = new Date();

  const postsCollectionRef = collection(db, "posts");

  // firestore에 데이터 올리기
  const createPosts = async () => {
    const data = await addDoc(postsCollectionRef, {
      board: "study",
      content,
      dateCreated: dateCreated.toLocaleDateString(),
      devStack,
      devType,
      haveHeadCount: 0,
      id: uuid(),
      nickName: "haza",
      onOff,
      startDate: startDate.toLocaleDateString(),
      title,
      totalHeadCount: totalHeadCount,
    });

    alert("스터디 모집 글 작성이 완료되었습니다:)");
  };

  return (
    <>
      <WriteInputContainer>
        <label htmlFor="title">제목</label>
        <div>
          <input
            defaultValue={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            id="title"
            placeholder="제목을 입력해주세요."
          />
        </div>
      </WriteInputContainer>
      <DivContainer>
        <WriteInputContainer width="95%">
          <label htmlFor="title">시작일자</label>
          <DatePick startDate={startDate} setStartDate={setStartDate} />
        </WriteInputContainer>
        <WriteInputContainer>
          <label htmlFor="title">모집구분</label>
          <div>
            <SelectBox
              defaultValue={devType}
              options={devTypeOptions}
              devTypeOptions={devTypeOptions}
              setDevType={setDevType}
            ></SelectBox>
          </div>
        </WriteInputContainer>
      </DivContainer>
      <DivContainer>
        <WriteInputContainer width="95%">
          <label htmlFor="title">모집인원</label>
          <div>
            <input
              type="number"
              defaultValue={totalHeadCount}
              onChange={(e) => {
                setTotalHeadCount(e.target.value);
              }}
              id="title"
              placeholder="ex) 10"
            />
            <span>명</span>
          </div>
        </WriteInputContainer>

        <WriteInputContainer>
          <label htmlFor="title">진행방식</label>
          <div>
            <SelectBox
              defaultValue={onOff}
              options={onOffOptions}
              setOnOff={setOnOff}
              onOffOptions={onOffOptions}
            ></SelectBox>
          </div>
        </WriteInputContainer>
      </DivContainer>

      <CheckBox
        defaultValue={devStack}
        setDevStack={setDevStack}
        devType={devType}
        devStack={devStack}
      />
      <WriteInputContainer height="400px">
        <label htmlFor="content">모집 상세</label>
        <div>
          <textarea
            defaultValue={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            id="content"
            placeholder="모집 상세 내용을 입력해주세요."
          />
        </div>
      </WriteInputContainer>
      <ButtonContainer>
        <ButtonPrimary background="#B6B6B6">취소</ButtonPrimary>
        <ButtonPrimary onClick={createPosts}>작성완료</ButtonPrimary>
      </ButtonContainer>
    </>
  );
};

export default WriteStudy;

const DivContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
