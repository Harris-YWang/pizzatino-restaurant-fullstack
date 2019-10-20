import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
  HttpErrors,
} from '@loopback/rest';
import { Order, Product, OrderCreation } from '../models';
import {OrderRepository, ProductRepository, UserRepository } from '../repositories';

export class OrderController {
  constructor(
    @repository(OrderRepository)
    public orderRepository : OrderRepository,
    @repository(ProductRepository)
    public productRepository: ProductRepository,
    @repository(UserRepository)
    public userRepository: UserRepository
  ) {}

  @post('/order', {
    responses: {
      '200': {
        description: 'Order model instance',
        content: {'application/json': {schema: {'x-ts-type': Order}}},
      },
    },
  })
  async create(@requestBody() orderRequest: OrderCreation): Promise<Order> {
    let newOrder = new Order();

    let customer = await this.userRepository.findById(orderRequest.userName);
    if (!customer) {
      throw new HttpErrors.BadRequest("customer not found");
    }
    newOrder.userName = orderRequest.userName;
    newOrder.orderItems = Object.assign([], orderRequest.orderItems);
    for (let orderItem of newOrder.orderItems) {
      let foundProduct = await this.productRepository.findById(orderItem.productId);
      orderItem.productName = foundProduct.name;
      orderItem.price = foundProduct.price;
    }
    newOrder.status = "ordered";
    return this.orderRepository.create(newOrder);
    //return await this.orderRepository.create(order);
  }

  @get('/order/count', {
    responses: {
      '200': {
        description: 'Order model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where,
  ): Promise<Count> {
    return await this.orderRepository.count(where);
  }

  @get('/order', {
    responses: {
      '200': {
        description: 'Array of Order model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Order}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Order)) filter?: Filter,
  ): Promise<Order[]> {
    return await this.orderRepository.find(filter);
  }

  @patch('/order', {
    responses: {
      '200': {
        description: 'Order PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() order: Order,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where,
  ): Promise<Count> {
    return await this.orderRepository.updateAll(order, where);
  }

  @get('/order/{id}', {
    responses: {
      '200': {
        description: 'Order model instance',
        content: {'application/json': {schema: {'x-ts-type': Order}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Order> {
    return await this.orderRepository.findById(id);
  }

  @patch('/order/{id}', {
    responses: {
      '204': {
        description: 'Order PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() order: Order,
  ): Promise<void> {
    await this.orderRepository.updateById(id, order);
  }

  @put('/order/{id}', {
    responses: {
      '204': {
        description: 'Order PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() order: Order,
  ): Promise<void> {
    await this.orderRepository.replaceById(id, order);
  }

  @del('/order/{id}', {
    responses: {
      '204': {
        description: 'Order DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.orderRepository.deleteById(id);
  }
}
