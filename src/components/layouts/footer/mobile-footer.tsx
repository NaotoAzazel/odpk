import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { helpCards } from "@/config/cards";
import Link from "next/link";

export function MobileFooter() {
  return (
    <Accordion type="multiple" className="w-ful">
      {helpCards.map((item, i) => (
        <AccordionItem value={item.title} key={i}>
          <AccordionTrigger className="hover:no-underline" key={i}>
            {item.title}
          </AccordionTrigger>
          <div className="flex flex-col">
            {item.items.map((subItem, index) => (
              <AccordionContent key={index}>
                <Link
                  className="leading-5 text-gray-300 text-base p-0"
                  href={subItem.href}
                  key={i}
                >
                  {subItem.title}
                </Link>
              </AccordionContent>
            ))}
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
