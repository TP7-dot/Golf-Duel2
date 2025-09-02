import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
import { Button } from "./components/ui/button";
import {
  Target,
  Users,
  Settings,
  BarChart3,
  History,
  Trophy,
} from "lucide-react";
import { PlayersManagement } from "./components/PlayersManagement";
import { ClubManagement } from "./components/ClubManagement";
import { NewRound } from "./components/NewRound";
import { ActiveRound } from "./components/ActiveRound";
import { Statistics } from "./components/Statistics";
import { RoundHistory } from "./components/RoundHistory";
import { ThemeToggle } from "./components/ThemeToggle";

export default function App() {
  const [activeView, setActiveView] = useState("home");
  const [currentRound, setCurrentRound] = useState(null);

  const renderContent = () => {
    if (currentRound) {
      return (
        <ActiveRound
          round={currentRound}
          onFinishRound={() => setCurrentRound(null)}
          onUpdateRound={setCurrentRound}
        />
      );
    }

    switch (activeView) {
      case "players":
        return <PlayersManagement />;
      case "clubs":
        return <ClubManagement />;
      case "new-round":
        return (
          <NewRound
            onStartRound={(round) => setCurrentRound(round)}
          />
        );
      case "statistics":
        return <Statistics />;
      case "history":
        return <RoundHistory />;
      default:
        return (
          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <Target className="size-16 mx-auto mb-4 text-primary" />
                <h1 className="mb-2">Golf Duel</h1>
                <p className="text-muted-foreground">
                  Track your scores, analyze your game, and
                  improve your performance
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Button
                  className="h-24 flex flex-col gap-2"
                  onClick={() => setActiveView("new-round")}
                >
                  <Trophy className="size-6" />
                  Start New Round
                </Button>

                <Button
                  variant="outline"
                  className="h-24 flex flex-col gap-2"
                  onClick={() => setActiveView("players")}
                >
                  <Users className="size-6" />
                  Manage Players
                </Button>

                <Button
                  variant="outline"
                  className="h-24 flex flex-col gap-2"
                  onClick={() => setActiveView("clubs")}
                >
                  <Target className="size-6" />
                  Manage Clubs
                </Button>

                <Button
                  variant="outline"
                  className="h-24 flex flex-col gap-2"
                  onClick={() => setActiveView("statistics")}
                >
                  <BarChart3 className="size-6" />
                  View Statistics
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center gap-2">
                <Target className="size-6" />
                <span className="text-lg font-semibold">
                  Golf Duel
                </span>
              </div>
              <ThemeToggle />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveView("home")}
                  isActive={activeView === "home"}
                >
                  <Target className="size-4" />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveView("new-round")}
                  isActive={activeView === "new-round"}
                >
                  <Trophy className="size-4" />
                  <span>New Round</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveView("players")}
                  isActive={activeView === "players"}
                >
                  <Users className="size-4" />
                  <span>Players</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveView("clubs")}
                  isActive={activeView === "clubs"}
                >
                  <Target className="size-4" />
                  <span>Clubs</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveView("statistics")}
                  isActive={activeView === "statistics"}
                >
                  <BarChart3 className="size-4" />
                  <span>Statistics</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveView("history")}
                  isActive={activeView === "history"}
                >
                  <History className="size-4" />
                  <span>History</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1">
          <div className="p-4 border-b flex items-center justify-between">
            <SidebarTrigger />
            <ThemeToggle />
          </div>
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
}