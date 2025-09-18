import { QazCloudLogo } from "@/components/ui/qazcloud-logo";
import { LanguageToggle } from "@/components/ui/language-toggle";

export const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-4 py-3 bg-transparent">
        <div className="flex items-center justify-between bg-transparent">
          {/* Logo in left corner */}
          <div className="flex items-center space-x-2">
            <QazCloudLogo className="h-10 w-10" />
          </div>
          
          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            <LanguageToggle />
          </div>
        </div>
      </div>
    </header>
  );
};