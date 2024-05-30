import EmailForm from "../../component/EmailForm";

export default function Contact() {
  return (
    <section className="w-full max-w-md my-14 h-[570px] mx-auto">
      <h1 className="font-bold text-2xl text-center pb-10">1:1 문의하기</h1>
      <EmailForm />
    </section>
  );
}
