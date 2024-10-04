import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { onDocumentCreated } from "firebase-functions/v2/firestore";

// Firebase 앱 초기화. 이는 Firebase 서비스를 사용하기 위해 필요.
initializeApp();

// Firestore 데이터베이스 인스턴스 가져오기
// eslint-disable-next-line no-unused-vars
const db = getFirestore();

// Google Sheets에 데이터 추가 요청
const saveToGoogleSheets = async (data) => {
  const url =
    "https://script.google.com/macros/s/AKfycbxvGUionKPbveWXegFJ3Ppl1_CUaGkfzibmtGq7AgjI5NbroReZWzg4Y-cCUkgsqAdh/exec"; // Apps Script에서 얻은 URL로 교체

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("구글시트에 데이터 보내기 완료!!", result);
  } catch (error) {
    console.error(error);
  }
};

// Firestore 문서 생성 이벤트 처리
// onDocumentCreated: 컬렉션에 새 문서가 생성될 때 트리거되는 함수 정의
export const onChureadCreate = onDocumentCreated(
  "chureads/{docId}", // {docId}: 실제 문서 ID를 대체하는 와일드카드로  'chureads' 컬렉션 내의 모든 문서에 대해 매칭
  async (event) => {
    try {
      const snapshot = event.data; // 새로 생성된 문서의 데이터와 메타데이터
      if (!snapshot) {
        // 새로 생성된 문서가 없는 경우
        console.log("이벤트 관련 데이터 없음");
        return;
      }
      const newValue = snapshot.data(); // 문서의 실제 데이터로 객체
      const result = await saveToGoogleSheets(newValue);
      console.log("Google Sheets 저장 결과:", result);
    } catch (error) {
      console.error("onChureadCreate 함수 실행 중 오류 발생:", error);
    }
  }
);
