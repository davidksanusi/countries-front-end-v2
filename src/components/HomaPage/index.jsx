import FeedbackForm from "../Feedback";
import Main from "./Main";
import Navbar from "./Navbar";
import Feedback from "./feedback";
import Footer from "./footer";

const HomaPage = async ({ countries, filters }) => {
  return (
    <>
      <Navbar />
      <Main countriesData={countries} filtersData={filters} />
      <Feedback />
      <Footer />
    </>
  );
};

export default HomaPage;
