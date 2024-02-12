import { OrderStatus, TrackingStatus, TrackingStep } from '../models/order.model';
import { getRandomInt } from './common';

export const generateTrackingSteps = (orderStatus: OrderStatus): TrackingStep[] => {
  const statusOrder: TrackingStatus[] = ['pending', 'shipped', 'delivered'];
  const steps: TrackingStep[] = [];
  let currentDate = new Date();

  if (orderStatus === 'canceled') {
    steps.push({
      active: false,
      canceled: true,
      status: 'canceled',
      timestamp: currentDate,
    });
  } else {
    for (const status of statusOrder) {
      const isActive = orderStatus === status;
      steps.push({
        active: isActive,
        canceled: false,
        status: status,
        timestamp: new Date(currentDate),
      });
      if (isActive) {
        break;
      }
      currentDate.setDate(currentDate.getDate() + getRandomInt(1, 3));
    }
  }

  return steps;
};
