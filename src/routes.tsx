import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Landing from "./LandingPage";
import PageNotFound from "./components/PageNotfound";
import Profile from "./components/Profile";
import PassForm from "./components/pass/PassForm";
import ViewPassComponent from "./components/pass/ViewPassComponent";
import RouteComponent from "./components/route/RouteComponent";
import TicketForm from "./components/ticket/TicketForm";
import ViewTicketComponent from "./components/ticket/ViewTicketComponent";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/bus-ticket",
        element: <TicketForm />,
      },
      {
        path: "/daily-pass",
        element: <PassForm />,
      },
      {
        path: "/view-ticket",
        element: <ViewTicketComponent />,
      },
      {
        path: "/view-pass",
        element: <ViewPassComponent />,
      },
      {
        path: "/route-timetable",
        element: <RouteComponent />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/my-tickets",
        element: <Profile />,
      },
      {
        path: "/complaints",
        element: <Profile />,
      },
      {
        path: "/help",
        element: <Landing />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/help",
    element: <Landing />,
  }
]);
