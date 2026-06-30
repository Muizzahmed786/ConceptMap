import {BrowserRouter, Routes, Route} from "react-router-dom";

import CanvasPage from "./pages/CanvasPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx"
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoute>
                                            <CanvasPage />
                                         </ProtectedRoute>} />
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App
