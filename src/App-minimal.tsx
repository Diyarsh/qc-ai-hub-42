import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        <h1 className="p-8 text-2xl font-bold">QC AI-HUB - Minimal Version</h1>
        <Routes>
          <Route path="/" element={<div className="p-8">Home Page</div>} />
          <Route path="*" element={<div className="p-8">Page Not Found</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;