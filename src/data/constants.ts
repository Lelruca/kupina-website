// Общие константы бренда и контактов.
// ВНИМАНИЕ: телефон и точки посадки уже подтверждены (совпадают с действующим сайтом),
// но перед публикацией всё равно стоит свериться с владельцами службы.

export const ORG_NAME = 'Неопалимая Купина';

export const PHONE_DISPLAY = '+7 (985) 263-76-50';
export const PHONE_HREF = 'tel:+79852637650';

export const PICKUP_POINTS = ['Купавна', 'Железнодорожный', 'Реутов', 'м. Новокосино'] as const;

export const BOOKING_DISABLED_MESSAGE =
  'Это демонстрационная версия. Заявка не отправлена. Для записи позвоните по телефону ' + PHONE_DISPLAY + '.';

export const REVIEW_DISABLED_MESSAGE =
  'Это демонстрационная версия. Отзыв не отправлен и не сохранён. Чтобы поделиться отзывом, позвоните по телефону ' +
  PHONE_DISPLAY +
  '.';

export const MESSENGER_PENDING_MESSAGE =
  'Ссылка появится после согласования с владельцами службы. Пока свяжитесь по телефону ' + PHONE_DISPLAY + '.';

// Мессенджеры пока не подтверждены владельцами службы — реальных ссылок нет.
// CONTENT_NEEDED: получить актуальные Telegram/WhatsApp контакты перед публикацией.
export const TELEGRAM_URL: string | null = null;
export const WHATSAPP_URL: string | null = null;
