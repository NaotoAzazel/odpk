import { newInformationCard } from "@/config/cards";
import { colors } from "@/config/colors";

export function MulticolorStitch() {
  return (
    <div className="grid grid-cols-4 gap-1 w-full h-full">
      {newInformationCard.map((card, i) => (
        <div key={i} className={`rounded-lg h-2 ${colors[card.color].stitch}`}>
          <div className="flex items-center justify-center h-full" >
            <div className="w-6 h-6 rounded-full bg-background" />
            <div className={`absolute w-4 h-4 rounded-full ${colors[card.color].stitch}`} />
          </div>
        </div>
      ))}
    </div>
  );
}
