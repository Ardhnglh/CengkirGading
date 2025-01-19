import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// Rute Admin
import Dashboard from "./pages/admin/dashboard/index";
import AdminDrama from "./pages/admin/drama/index";
import AdminCreateRating from "./pages/admin/drama/rating/create";
import AdminEditRating from "./pages/admin/drama/rating/edit";
import AdminCreateParameter from "./pages/admin/drama/parameter/create";
import AdminEditParameter from "./pages/admin/drama/parameter/edit";
import AdminUser from "./pages/admin/userList/index";
import AdminCreateUser from "./pages/admin/userList/create";
import AdminEditUser from "./pages/admin/userList/edit";
import AdminKalender from "./pages/admin/kalender/index";
import AdminCreateKalender from "./pages/admin/kalender/create";
import AdminEditKalender from "./pages/admin/kalender/edit";
import AdminKarakter from "./pages/admin/karakter/index";
import AdminCreateKarakter from "./pages/admin/karakter/create";
import AdminEditKarakter from "./pages/admin/karakter/edit";
import AdminSkenario from "./pages/admin/skenario/index";
import AdminCreateSkenario from "./pages/admin/skenario/create";
import AdminEditSkenario from "./pages/admin/skenario/edit";
import AdminExercise from "./pages/admin/exercise/index";
import AdminCreateExercise from "./pages/admin/exercise/create";
import AdminEditExercise from "./pages/admin/exercise/edit";

// Rute Web
import Beranda from "./pages/web/beranda";
import Login from "./pages/web/login";
import SignUp from "./pages/web/signup";
import Drama from "./pages/web/drama/index";
import Riwayat from "./pages/web/drama/riwayat";
import KalenderAcara from "./pages/web/kalender/index";
import EvaluasiKarakter from "./pages/web/karakter/index";
import KontakDukungan from "./pages/web/kontak/index";
import Skenario from "./pages/web/skenario/index";
import ExerrciseArtikel from "./pages/web/exercise/artikel/index";
import ExerrciseBuku from "./pages/web/exercise/buku/index";
import ExerciseAkting from "./pages/web/exercise/teori-teori/index";
import ExerciseVideo from "./pages/web/exercise/video/index";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rute Admin dengan proteksi */}
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute element={Dashboard} />}
        />
        <Route
          path="/admin/drama"
          element={<ProtectedRoute element={AdminDrama} />}
        />
        <Route
          path="/admin/drama/rating/create/:id"
          element={<ProtectedRoute element={AdminCreateRating} />}
        />
        <Route
          path="/admin/drama/rating/edit/:id"
          element={<ProtectedRoute element={AdminEditRating} />}
        />
        <Route
          path="/admin/drama/parameter/create"
          element={<ProtectedRoute element={AdminCreateParameter} />}
        />
        <Route
          path="/admin/drama/parameter/edit/:id"
          element={<ProtectedRoute element={AdminEditParameter} />}
        />
        <Route
          path="/admin/user"
          element={<ProtectedRoute element={AdminUser} />}
        />
        <Route
          path="/admin/user/create"
          element={<ProtectedRoute element={AdminCreateUser} />}
        />
        <Route
          path="/admin/user/edit/:id"
          element={<ProtectedRoute element={AdminEditUser} />}
        />
        <Route
          path="/admin/kalender"
          element={<ProtectedRoute element={AdminKalender} />}
        />
        <Route
          path="/admin/kalender/create"
          element={<ProtectedRoute element={AdminCreateKalender} />}
        />
        <Route
          path="/admin/kalender/edit/:id"
          element={<ProtectedRoute element={AdminEditKalender} />}
        />
        <Route
          path="/admin/karakter"
          element={<ProtectedRoute element={AdminKarakter} />}
        />
        <Route
          path="/admin/karakter/create"
          element={<ProtectedRoute element={AdminCreateKarakter} />}
        />
        <Route
          path="/admin/karakter/edit/:id"
          element={<ProtectedRoute element={AdminEditKarakter} />}
        />
        <Route
          path="/admin/skenario"
          element={<ProtectedRoute element={AdminSkenario} />}
        />
        <Route
          path="/admin/skenario/create"
          element={<ProtectedRoute element={AdminCreateSkenario} />}
        />
        <Route
          path="/admin/skenario/edit/:id"
          element={<ProtectedRoute element={AdminEditSkenario} />}
        />
        <Route
          path="/admin/exercise"
          element={<ProtectedRoute element={AdminExercise} />}
        />
        <Route
          path="/admin/exercise/create"
          element={<ProtectedRoute element={AdminCreateExercise} />}
        />
        <Route
          path="/admin/exercise/edit/:id"
          element={<ProtectedRoute element={AdminEditExercise} />}
        />

        {/* Rute Web tanpa proteksi */}
        <Route path="/" element={<Beranda />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Rute User dengan proteksi */}
        <Route
          path="/user/drama/:id"
          element={<ProtectedRoute element={Drama} />}
        />
        <Route
          path="/user/drama/riwayat/:id"
          element={<ProtectedRoute element={Riwayat} />}
        />
        <Route
          path="/user/kalender-acara"
          element={<ProtectedRoute element={KalenderAcara} />}
        />
        <Route
          path="/user/evaluasi-karakter/:id"
          element={<ProtectedRoute element={EvaluasiKarakter} />}
        />
        <Route
          path="/user/kontak"
          element={<ProtectedRoute element={KontakDukungan} />}
        />
        <Route
          path="/user/skenario"
          element={<ProtectedRoute element={Skenario} />}
        />
        <Route
          path="/user/daily-exercise/artikel"
          element={<ProtectedRoute element={ExerrciseArtikel} />}
        />
        <Route
          path="/user/daily-exercise/buku"
          element={<ProtectedRoute element={ExerrciseBuku} />}
        />
        <Route
          path="/user/daily-exercise/akting"
          element={<ProtectedRoute element={ExerciseAkting} />}
        />
        <Route
          path="/user/daily-exercise/video"
          element={<ProtectedRoute element={ExerciseVideo} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
