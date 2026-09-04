export function formatPrice(price: number): string {
  return `${price.toLocaleString('ru-RU')} ₽`;
}

/** Русское склонение существительного по числу: 1 место, 2 места, 5 мест. */
export function pluralizeRu(count: number, forms: [one: string, few: string, many: string]): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
}

export function seatsLabel(count: number): string {
  return `${count} ${pluralizeRu(count, ['место', 'места', 'мест'])}`;
}
