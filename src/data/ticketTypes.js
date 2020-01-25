import UserTicket from "../components/pages/PersonalAccount/Moderator/Baggage/Tickets/UserTicket/UserTicket";
import BaggageTicket from "../components/pages/PersonalAccount/Moderator/Baggage/Tickets/BaggageTicket/BaggageTicket";
import AllTickets from "../components/pages/PersonalAccount/Moderator/Baggage/Tickets/AllTickets/AllTickets";

export default {
  user: {
    component: UserTicket
  },
  baggage: {
    component: BaggageTicket
  },
  all: {
    component: AllTickets
  }
};