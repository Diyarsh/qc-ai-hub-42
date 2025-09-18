import {
  Settings,
  Flag,
  CheckSquare,
  FileText,
  Users,
  HelpCircle,
  FileSpreadsheet,
  Share2,
  Crown,
  LogOut,
  User
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const UserMenu = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Выход выполнен",
        description: "До свидания!",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось выйти из системы",
        variant: "destructive",
      });
    }
  };

  const menuItems = [
    {
      icon: Settings,
      label: "Settings",
      onClick: () => navigate('/settings')
    },
    {
      icon: Flag,
      label: "Report Issue",
      onClick: () => {
        toast({
          title: "Функция в разработке",
          description: "Скоро будет доступна"
        });
      }
    },
    {
      icon: CheckSquare,
      label: "Tasks",
      onClick: () => {
        toast({
          title: "Функция в разработке",
          description: "Скоро будет доступна"
        });
      }
    },
    {
      icon: FileText,
      label: "Files",
      onClick: () => {
        toast({
          title: "Функция в разработке",
          description: "Скоро будет доступна"
        });
      }
    },
    {
      icon: Users,
      label: "Community",
      onClick: () => {
        toast({
          title: "Функция в разработке",
          description: "Скоро будет доступна"
        });
      }
    },
    {
      icon: HelpCircle,
      label: "FAQ",
      onClick: () => {
        toast({
          title: "Функция в разработке",
          description: "Скоро будет доступна"
        });
      }
    },
    {
      icon: FileSpreadsheet,
      label: "Changelog",
      onClick: () => {
        toast({
          title: "Функция в разработке",
          description: "Скоро будет доступна"
        });
      }
    },
    {
      icon: Share2,
      label: "Shared Links",
      onClick: () => {
        toast({
          title: "Функция в разработке",
          description: "Скоро будет доступна"
        });
      }
    },
    {
      icon: Crown,
      label: "Upgrade plan",
      onClick: () => {
        toast({
          title: "Функция в разработке",
          description: "Скоро будет доступна"
        });
      }
    }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-gradient-primary text-white text-sm">
              {user?.user_metadata?.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 p-2 bg-popover border border-border shadow-lg" 
        align="end"
        sideOffset={5}
      >
        {menuItems.map((item, index) => (
          <DropdownMenuItem
            key={item.label}
            onClick={item.onClick}
            className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-accent rounded-md transition-colors"
          >
            <item.icon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{item.label}</span>
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator className="my-1" />
        
        <DropdownMenuItem
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-destructive/10 text-destructive rounded-md transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span className="text-sm">Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};