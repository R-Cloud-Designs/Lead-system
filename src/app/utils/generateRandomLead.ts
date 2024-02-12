import { DeliveryPreference, Lead, LeadStatus, generateLeadId } from '../models/lead.model';
import { getRandomInt } from './common';
import { generateOrderHistory } from './generateRandomOrderHistory';
import { v4 as uuidv4 } from 'uuid';

export const generateRandomLead = (index: number) => {
  const leadId = generateLeadId(uuidv4().split('-').join(''));
  const statusOptions: LeadStatus[] = ['new', 'contacted', 'qualified', 'lost', 'order_placed'];
  const deliveryPreference: DeliveryPreference[] = ['standard', 'express'];

  return {
    id: leadId,
    name: `Sample Name ${index}`,
    email: `sample${index}@example.com`,
    phone: `${getRandomInt(100, 999)}-${getRandomInt(100, 999)}-${getRandomInt(1000, 9999)}`,
    status: statusOptions[getRandomInt(0, statusOptions.length - 1)],
    createdAt: new Date(new Date().setDate(new Date().getDate() - getRandomInt(0, 60))),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - getRandomInt(0, 60))),
    address: `Sample Address ${index}`,
    productsOfInterest: ['Product A', 'Product B', 'Product C'],
    lastInteraction: new Date(new Date().setDate(new Date().getDate() - getRandomInt(0, 30))),
    deliveryPreference: deliveryPreference[getRandomInt(0, deliveryPreference.length - 1)],
    trackingNumber: `TN${index.toString().padStart(4, '0')}`,
    orderHistory: generateOrderHistory(index),
  } as Lead;
};
