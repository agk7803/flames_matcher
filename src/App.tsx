import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Match from "./pages/Match";
import Result from "./pages/Result";
import NotFound from "./pages/NotFound";
import bgImage from "@/assets/bg.jpg";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="relative min-h-screen w-full">
          <div
            className="fixed inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          <div className="relative z-10">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/match" element={<Match />} />
              <Route path="/result/:id" element={<Result />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
