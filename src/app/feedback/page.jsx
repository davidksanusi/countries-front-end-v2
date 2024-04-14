import FeedbackForm from "@/components/Feedback";
import Footer from "@/components/HomaPage/footer";
import Navbar from "@/components/HomaPage/Navbar";

export default function FeedbackPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <FeedbackForm />
      <Footer />
    </div>
  );
}
