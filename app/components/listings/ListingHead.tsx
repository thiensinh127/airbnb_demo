import useCountries from "@/app/hooks/useCountry";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import { HearButton } from "../HearButton";

interface ListingHeadProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div
        className="
          w-full
          h-[60vh]
          overflow-hidden
          rounded-xl
          relative
        "
      >
        <Image
          fill
          src={imageSrc}
          alt={title}
          className="w-full object-cover"
        />
        <div
          className="
            absolute
            top-5
            right-5
          "
        >
          <HearButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
