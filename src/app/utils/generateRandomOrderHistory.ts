import { Order, OrderStatus, generateOrderId } from '../models/order.model';
import { getRandomInt } from './common';
import { v4 as uuidv4 } from 'uuid';
import { generateTrackingSteps } from './generateRandomTrackingSteps';
import { generateRandomProducts } from './generateRandomProducts';

const courierNames = ['FedEx', 'UPS', 'USPS', 'DHL'];

export const generateOrderHistory = (index: number) => {
  const orderStatusMap: OrderStatus[] = ['pending', 'shipped', 'delivered', 'canceled'];
  const orderCount = getRandomInt(1, 5);
  const orders = [];

  for (let i = 0; i < orderCount; i++) {
    const orderId = generateOrderId(uuidv4().split('-').join(''));
    const orderStatusIndex = getRandomInt(0, orderStatusMap.length - 1);
    const orderStatus = orderStatusMap[orderStatusIndex];

    orders.push({
      orderId: orderId,
      storeName: `Sample Store ${index}`,
      storeUrl: `https://example.com/store/${index}`,
      products: generateRandomProducts(getRandomInt(1, 5)),
      totalPrice: getRandomInt(50, 200),
      status: orderStatus,
      trackingNumber: `TN${index.toString().padStart(4, '01')}`,
      deliveryAddress: `Sample Address ${index}`,
      estimatedDeliveryDate: new Date(new Date().setDate(new Date().getDate() + getRandomInt(1, 7))),
      courierName: courierNames[getRandomInt(0, courierNames.length - 1)],
      trackingSteps: generateTrackingSteps(orderStatus),
    } as Order);
  }

  return orders;
};
