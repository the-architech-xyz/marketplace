/**
 * Native Formatting Utilities for Expo
 * 
 * Uses native device formatting capabilities
 */

import * as Localization from 'expo-localization';

/**
 * Get device locale
 */
export function getDeviceLocale(): string {
  return Localization.locale;
}

/**
 * Format date using device locale
 */
export function formatDate(date: Date): string {
  const locale = Localization.locale;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

/**
 * Format time using device locale
 */
export function formatTime(date: Date): string {
  const locale = Localization.locale;
  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: 'numeric'
  }).format(date);
}

/**
 * Format number using device locale
 */
export function formatNumber(value: number): string {
  const locale = Localization.locale;
  return new Intl.NumberFormat(locale).format(value);
}

/**
 * Format currency using device locale
 */
export async function formatCurrency(value: number, currency?: string): Promise<string> {
  const locale = Localization.locale;
  const deviceCurrency = currency || await Localization.getCurrencyAsync();
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: deviceCurrency
  }).format(value);
}

/**
 * Get device currency
 */
export async function getDeviceCurrency(): Promise<string> {
  return await Localization.getCurrencyAsync();
}

/**
 * Get device country code
 */
export async function getDeviceCountryCode(): Promise<string> {
  return await Localization.getCountryCodeAsync();
}

/**
 * Check if device uses 24-hour time
 */
export function is24HourTime(): boolean {
  const locale = Localization.locale;
  const options: Intl.DateTimeFormatOptions = { hour: 'numeric' };
  const formatter = new Intl.DateTimeFormat(locale, options);
  const parts = formatter.formatToParts(new Date());
  const hour12 = parts.find(part => part.type === 'dayPeriod');
  return !hour12;
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date): string {
  const locale = Localization.locale;
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  
  const now = new Date();
  const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);
  
  const units = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ];
  
  for (const { label, seconds } of units) {
    const diff = Math.floor(Math.abs(diffInSeconds) / seconds);
    if (diff >= 1) {
      return rtf.format(diff * Math.sign(diffInSeconds), label as Intl.RelativeTimeFormatUnit);
    }
  }
  
  return rtf.format(0, 'second');
}

