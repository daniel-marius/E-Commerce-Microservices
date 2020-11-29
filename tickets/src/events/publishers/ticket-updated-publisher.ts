import { Publisher, Subjects, TicketUpdatedEvent } from '@ticketsms/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
