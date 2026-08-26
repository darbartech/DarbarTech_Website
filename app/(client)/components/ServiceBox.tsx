import { MessageCircle } from "lucide-react";

interface ItemProps {
  title: string;
  description: string;
}

interface ServicesBoxProps {
  item: ItemProps;
}

export const ServicesBox = ({ item }: ServicesBoxProps) => {
  return (
    <div className="space-y-4 rounded-md p-5 text-center shadow-md sm:space-y-5 sm:p-6 lg:p-7">
      <MessageCircle className="mx-auto h-10 w-10 sm:h-12 sm:w-12" />

      <h3 className="text-base font-semibold text-(--primary-text-color) sm:text-lg">
        {item.title}
      </h3>

      <p className="text-sm leading-relaxed text-(--bg-muted) sm:text-base">
        {item.description}
      </p>
    </div>
  );
};