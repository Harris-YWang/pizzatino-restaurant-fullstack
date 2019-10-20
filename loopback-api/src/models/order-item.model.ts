import {Entity, model, property} from '@loopback/repository';

@model()
export class OrderItem extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  productId: string;

  @property({
    type: 'number',
    required: true,
  })
  orderId: number;

  @property({
    type: 'string',
  })
  productName?: string;

  @property({
    type: 'number',
    required: true,
  })
  productQuantity: number;

  @property({
    type: 'number',
  })
  price?: number;


  constructor(data?: Partial<OrderItem>) {
    super(data);
  }
}
