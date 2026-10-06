import Image from "next/image";
import Link from "next/link";
import { CircleCheck } from "lucide-react";

interface Category {
  slug?: string;
  title: string;
  description?: string;
  lists?: string[];
}

interface Props {
  info?: string;
  topic: string;
  description: string;
  image: string;
  altDescription?: string;
  buttonName?: string;
  lists:
    | string[]
    | {
        [key: string]: string;
      }
    | Category[];
  isImageOnLeft: boolean;
  href?: string;
}

const IllustrationAndContent = ({
  info,
  topic,
  description,
  image,
  altDescription = "",
  buttonName,
  lists,
  isImageOnLeft,
  href = "/services",
}: Props) => {
  const categories: Category[] = Array.isArray(lists)
    ? lists.map((item) => {
        if (typeof item === "string") {
          return {
            slug: item.toLowerCase().replace(/\s+/g, "-"),
            title: item,
          };
        }

        return item;
      })
    : Object.entries(lists).map(([title, description]) => ({
        slug: title.toLowerCase().replace(/\s+/g, "-"),
        title,
        description,
      }));

  return (
    <section
      className={`
        flex
        flex-col
        gap-8
        px-5
        py-10
        font-bold
        sm:px-8
        sm:py-12
        md:px-12
        md:py-15
        ${isImageOnLeft ? "md:flex-row" : "md:flex-row-reverse"}
        md:items-center
        md:gap-5
        lg:px-20
        xl:px-30
      `}
    >
      {/* Illustration image */}
      <div className="w-full md:w-[50%]">
        {image && (
          <Image
            src={`/about/${image}`}
            alt={altDescription}
            width={100}
            height={100}
            className="mx-auto h-auto w-full max-w-xl"
          />
        )}
      </div>

      {/* Description side */}
      <div className="w-full space-y-5 lg:w-[50%]">
        {info && (
          <p className="text-sm text-(--secondary-bg-color)">
            {info}
          </p>
        )}

        <h2 className="text-3xl sm:text-4xl md:text-5xl">
          {topic}
        </h2>

        <p className="text-left text-base text-(--bg-muted)">
          {description}
        </p>

        {/* Categories */}
        <div className="space-y-5">
          {categories.map((category) => (
            <div
              key={category.slug ?? category.title}
              className="space-y-2"
            >
              <div className="flex items-center gap-2">
                <span>
                  <CircleCheck
                    className="text-(--secondary-bg-color)"
                    size={18}
                  />
                </span>

                <h3 className="text-md">
                  {category.title}
                </h3>
              </div>

              {category.description && (
                <p className="text-sm font-semibold text-(--bg-muted)">
                  {category.description}
                </p>
              )}

              {category.lists && (
                <div className="grid grid-cols-1 gap-2 py-2 font-semibold sm:grid-cols-2">
                  {category.lists.map((item, index) => (
                    <p
                      className="
                        flex
                        items-center
                        gap-2
                        rounded
                        bg-(--surface)
                        px-3
                        py-2
                        text-sm
                        text-(--bg-muted)
                        sm:text-base
                      "
                      key={index}
                    >
                      <span>
                        <CircleCheck
                          className="text-(--secondary-bg-color)"
                          size={18}
                        />
                      </span>

                      {item}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Button */}
        {buttonName && (
          <div
            className="
              flex
              flex-col
              gap-3
              text-base
              font-semibold
              sm:flex-row
              sm:text-lg
            "
          >
            <Link
              href={href}
              className="rounded-3xl px-6 py-2 text-base btn-primary-hover-state"
            >
              {buttonName}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default IllustrationAndContent;