import { Product, generateProductId } from '../models/product.model';
import { getRandomInt } from './common';
import { v4 as uuidv4 } from 'uuid';

const productNames = [
  'Wireless Bluetooth Headphones',
  'Ergonomic Office Chair',
  'Smartphone Case',
  'Stainless Steel Watch',
  'Running Shoes',
  'Sunglasses',
  'Backpack',
  'Yoga Mat',
];

export const generateRandomProducts = (count: number): Product[] => {
  const products: Product[] = [];
  for (let i = 0; i < count; i++) {
    const productName = productNames[getRandomInt(0, productNames.length - 1)];
    const webSafeName = productName.toLowerCase().split(' ').join('-');
    products.push({
      id: generateProductId(uuidv4().split('-').join('')),
      name: productName,
      url: `/assets/images/${encodeURIComponent(webSafeName)}.jpg`,
    });
  }
  return products;
};
