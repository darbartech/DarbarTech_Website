
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const PartnersSection = () => {
  const [partners, setPartners] = useState<any[]>([]);

  useEffect(() => {
    const getAllPartners = async () => {
      try {
        const response = await fetch("/api/client/home/partners");

        if (!response.ok) {
          throw new Error(
            `Request failed with status ${response.status}`
          );
        }

        const data = await response.json();

        console.log("Partners:", data);

        setPartners(data);
      } catch (error) {
        console.error("Error fetching partners data:", error);
      }
    };

    getAllPartners();
  }, []);

  return (
    <section
      className="
        flex
        flex-wrap
        items-center
        justify-center
        gap-8
        px-5
        py-10
        sm:gap-10
        sm:px-8
        sm:py-12
        md:justify-between
        md:gap-6
        md:px-12
        md:py-15
        lg:px-20
        xl:px-30
      "
    >
      {partners.map((item, index) => (
        <Image
          key={item.id ?? index}
          src={`/home/partners/${item.imageName}`}
          alt={item.name}
          width={100}
          height={100}
        />
      ))}
    </section>
  );
};

export default PartnersSection;
