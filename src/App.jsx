import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

import LandingPage from './pages/LandingPage';
import RoleSelectionPage from './pages/RoleSelectionPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import QuizPage from './pages/quiz/QuizPage';
import UserDashboard from './pages/dashboard/UserDashboard';
import PlannerDashboard from './pages/dashboard/PlannerDashboard';
import JoinerDashboard from './pages/dashboard/JoinerDashboard';
import CreateTripPage from './pages/trips/CreateTripPage';
import MyTripsPage from './pages/trips/MyTripsPage';
import PublicTripPage from './pages/trips/PublicTripPage';
import ItineraryBuilderPage from './pages/itinerary/ItineraryBuilderPage';
import ItineraryTimelinePage from './pages/itinerary/ItineraryTimelinePage';
import ActivitySearchPage from './pages/activities/ActivitySearchPage';
import BudgetAnalyticsPage from './pages/budget/BudgetAnalyticsPage';
import PackingChecklistPage from './pages/packing/PackingChecklistPage';
import NotesJournalPage from './pages/notes/NotesJournalPage';
import TravelInspirationPage from './pages/gallery/TravelInspirationPage';
import DashboardLayout from './layouts/DashboardLayout';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/role-select" element={<RoleSelectionPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/gallery" element={<TravelInspirationPage />} />
            <Route path="/explore" element={<TravelInspirationPage />} />

            {/* Dashboards */}
            <Route path="/dashboard/user" element={<DashboardLayout role="user" />}>
              <Route index element={<UserDashboard />} />
            </Route>
            <Route path="/dashboard/planner" element={<DashboardLayout role="planner" />}>
              <Route index element={<PlannerDashboard />} />
            </Route>
            <Route path="/dashboard/joiner" element={<DashboardLayout role="joiner" />}>
              <Route index element={<JoinerDashboard />} />
            </Route>

            {/* Trip pages */}
            <Route path="/create-trip" element={<CreateTripPage />} />
            <Route path="/my-trips" element={<MyTripsPage />} />
            <Route path="/public-trip" element={<PublicTripPage />} />

            {/* Itinerary */}
            <Route path="/itinerary-builder" element={<ItineraryBuilderPage />} />
            <Route path="/itinerary-timeline" element={<ItineraryTimelinePage />} />

            {/* Supporting */}
            <Route path="/activities" element={<ActivitySearchPage />} />
            <Route path="/budget" element={<BudgetAnalyticsPage />} />
            <Route path="/packing" element={<PackingChecklistPage />} />
            <Route path="/notes" element={<NotesJournalPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
