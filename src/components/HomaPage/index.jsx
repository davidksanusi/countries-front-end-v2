import Main from "./Main";
import Navbar from "./Navbar";
import Feedback from "./feedback";
import Footer from "./footer";

const HomaPage = ({ countries }) => {
  return (
    <>
      <Navbar />
      <Main countriesData={countries} />
      <Feedback />
      <Footer />
    </>
  );
};

export default HomaPage;
