import {Entity, model, property} from '@loopback/repository';
import { OrderItem } from './order-item.model';

@model()
export class Order extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  userName: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property.array(OrderItem, {
    name: 'orderItems'
  })
  orderItems: OrderItem[];


  constructor(data?: Partial<Order>) {
    super(data);
  }
}
