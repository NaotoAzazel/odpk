import Link from "next/link";

import { HELP_CARDS } from "@/shared/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui";

export function MobileFooter() {
  return (
    <Accordion type="multiple" className="w-ful">
      {HELP_CARDS.map((item, i) => (
        <AccordionItem value={item.title} key={i}>
          <AccordionTrigger className="hover:no-underline" key={i}>
            {item.title}
          </AccordionTrigger>
          <div className="flex flex-col">
            {item.items.map((subItem, index) => (
              <AccordionContent key={index}>
                <Link
                  className="p-0 text-base leading-5 text-gray-300"
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
