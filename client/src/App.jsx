import {BrowserRouter, Routes, Route} from "react-router-dom";

import CanvasPage from "./pages/CanvasPage.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CanvasPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App
