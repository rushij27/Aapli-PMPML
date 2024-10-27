import { Link } from "react-router-dom";
import MetroCard from "./components/MetroCard";
import DailyPassCard from "./components/pass/DailyPassCard";
import PassCard from "./components/pass/PassCard";
import RouteCard from "./components/route/RouteCard";
import BusTicketCard from "./components/ticket/BusTicketCard";
import TicketCard from "./components/ticket/TicketCard";
import { useGeneralContext } from "./generalContextApi";
import { Alert, Box, Snackbar } from "@mui/material";
import { useState } from "react";
import NearMeComponent from "./components/nearme/NearMe";
import NearByComponent from "./components/nearby/NearBy";

const Landing = () => {
  const context: any = useGeneralContext();
  const [state] = useState({
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal } = state;

  const handleClose = () => {
    context.setState((prev: any) => ({ ...prev, isSessionExpired: false }));
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <WelcomeSection />
        <div className="grid grid-cols-2 sm:flex sm:flex-row items-center justify-around gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-10 max-w-7xl mx-auto py-10 px-10">
          <Link to="/bus-ticket"><BusTicketCard /></Link>
          <Link to="/daily-pass"><DailyPassCard /></Link>
        </div>
        <div className="grid grid-cols-4 sm:flex sm:flex-row items-center justify-around gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-10 max-w-7xl mx-auto">
          <TicketCard />
          <PassCard />
          <RouteCard />
          <MetroCard />
        </div>
        <section>
          <NearMeComponent />
        </section>
        <section>
          <NearByComponent />
        </section>
      </div>
      <Box sx={{ width: 500 }}>
        <Snackbar
          autoHideDuration={2000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={context.state.isSessionExpired}
          key={vertical + horizontal}
        >
          <Alert
            severity="error"
            variant="standard"
            sx={{ width: '100%' }}
          >
            Session Expired
          </Alert>
        </Snackbar>
      </Box>

    </>
  );
}

export default Landing;


export function WelcomeSection() {
  return (
    <div className="flex flex-row items-center justify-between gap-2 sm:gap-4 lg:gap-8 py-6 lg:py-14 px-2 sm:px-4 max-w-7xl mx-auto overflow-x-hidden">
      <img
        src="/public/bus.png"
        alt="Regular Bus"
        className="w-1/3 h-20 sm:w-48 sm:h-32 lg:w-80 lg:h-48"
      />

      <h1 className="text-base sm:text-2xl lg:text-4xl font-bold text-center">
        Welcome to<br className="sm:hidden" /> Apli PMPML
      </h1>

      <img
        src="/public/ac-bus.png"
        alt="AC Bus"
        className="w-1/3 h-20 sm:w-48 sm:h-32 lg:w-80 lg:h-48"
      />
    </div>
  );
}