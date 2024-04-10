import { FilterComponent } from "@/components/filters";
import CountryCard from "@/components/HomaPage/countryCard";
import Feedback from "@/components/HomaPage/feedback";
import Footer from "@/components/HomaPage/footer";
import Navbar from "@/components/HomaPage/Navbar";
import { Skeleton } from "antd";

const HomaPageLoading = () => {
  const dummyBabies = new Array(20).fill(null); // Create an array with 8 null elements for dummy cards

  return (
    <>
      <Navbar />
      <>
        <div className="flex flex-col gap-12 justify-start items-start py-6 px-4 bg-white">
          <div className="flex flex-col justify-start items-start gap-6">
            {/* Heading */}
            <>
              {" "}
              <span className="h-[40px] w-full px-4 md:px-6 lg:px-16 xl:px-6">
                <Skeleton
                  active
                  title={{ width: "25%" }}
                  paragraph={{ rows: 1 }}
                />
              </span>
            </>

            {/* Select fields */}
            <FilterComponent
              handleSelectValue={null}
              continents={null}
              languages={null}
              currency={null}
              borders={null}
              independent={null}
              UN_member={null}
              landlocked={null}
              sort_category={null}
              sort_order={null}
              clearFilter={null}
            />
          </div>
          <div className="px-2 md:px-2 lg:px-2 xl:px-2 grid grid-cols-5 mx-auto gap-5">
            {dummyBabies.map((_, index) => (
              <CountryCard key={index} loading={true} />
            ))}
          </div>
        </div>
      </>
      <Feedback />
      <Footer />
    </>
  );
};

export default HomaPageLoading;
