import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <MaxWidthWrapper>
        <div className="flex py-6 flex-col items-center gap-4 md:flex-row md:gap-2">
          <p className="font-sans text-center text-sm md:text-left">
            {currentYear} Олександрійський політехнічний фаховий коледж
          </p>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}