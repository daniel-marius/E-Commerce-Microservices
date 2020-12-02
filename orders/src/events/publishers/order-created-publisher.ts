import { Publisher, OrderCreatedEvent, Subjects } from '@ticketsms/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
