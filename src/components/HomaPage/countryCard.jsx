import { Skeleton } from "antd";
import Image from "next/image";
import Link from "next/link";

const CountryCard = ({ country, loading }) => {
  function formatNumberWithKMB(numberStr) {
    // Remove commas and convert the string to a number
    const number = parseFloat(numberStr.replace(/,/g, ""));

    if (number >= 1000000000) {
      return (number / 1000000000).toFixed(2) + "B";
    } else if (number >= 1000000) {
      return (number / 1000000).toFixed(2) + "M";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(2) + "K";
    } else {
      return number.toString();
    }
  }
  return (
    <Link
      href={country ? `/country/${country?.code}/overview` : "/"}
      className="cursor-pointer col-span-1 flex h-[56px] w-[300px] rounded-xl p-1 gap-5 flex-col"
    >
      {!loading ? (
        <>
          <div className="flex items-center gap-5">
            {" "}
            <div className="h-[56px] w-[56px] text-[48px] flex items-center ">
              {country?.flag ? country?.flag : <Image src={country?.flag_svg} height={56} width={56} alt="" />}
            </div>
            <div className="flex flex-col justify-center">
              {" "}
              <p className="text-base  font-medium leading-normal text-black">
                {country?.name}
              </p>
              {country?.population && <p className="text-sm font-medium leading-normal m-0 text-[#61788A] flex gap-2">
               <span>Population : </span> <span>{country?.population}</span>
              </p>}
            </div>
          </div>
        </>
      ) : (
        <div className="cursor-pointer col-span-1 flex h-[56px] w-[300px] rounded-xl p-1 gap-5 flex-col">
          <Skeleton active title={{ height: 50 }} paragraph={{ rows: 1 }} />
        </div>
      )}
    </Link>
  );
};

export default CountryCard;
