import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Models from "./pages/Models";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import Templates from "./pages/Templates";
import Laboratory from "./pages/Laboratory";
import Datasets from "./pages/Datasets";
import Documentation from "./pages/Documentation";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <BrowserRouter>
        <div className="min-h-screen bg-background text-foreground">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/models" element={<div className="p-8 text-2xl">Models - Simplified</div>} />
            <Route path="/projects" element={<div className="p-8 text-2xl">Projects - Simplified</div>} />
            <Route path="/projects/new" element={<NewProject />} />
            <Route path="/templates" element={<div className="p-8 text-2xl">Templates - Simplified</div>} />
            <Route path="/lab" element={<div className="p-8 text-2xl">Laboratory - Simplified</div>} />
            <Route path="/datasets" element={<div className="p-8 text-2xl">Datasets - Simplified</div>} />
            <Route path="/docs" element={<div className="p-8 text-2xl">Documentation - Simplified</div>} />
            <Route path="/settings" element={<div className="p-8 text-2xl">Settings - Simplified</div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
