import {BrowserRouter, Routes, Route} from "react-router-dom";

import CanvasPage from "./pages/CanvasPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoute>
                                            <CanvasPage />
                                         </ProtectedRoute>} />
                <Route path="/login" element={<AuthPage mode="login" />}/>
                <Route path="/register" element={<AuthPage mode="register" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App
