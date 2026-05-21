import { content } from '../config/content';

export function getWhatsAppUrl(message?: string): string {
  const { number, defaultMessage } = content.contact.whatsapp;
  const text = encodeURIComponent(message || defaultMessage);
  return `https://wa.me/${number}?text=${text}`;
}

export function buildWhatsAppMessage(name: string, phone: string, message: string): string {
  return `היי חגית! 👋\nשמי ${name}\nטלפון: ${phone}\n\n${message}`;
}
