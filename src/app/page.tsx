import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>랜딩 페이지</h1>
      <section>온라인에서도 함께 섹션</section>
      <section>서비스 자랑목록 섹션</section>
      <section>사용자 후기 섹션</section>
      <section>기존 모임 노출</section>
    </main>
  );
}
