import { Subjects, Publisher, PaymentCreatedEvent } from '@ticketsms/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
