import { Publisher, Subjects, TicketCreatedEvent } from '@ticketsms/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
