import type { H3Event, EventHandlerRequest } from 'h3';
import { setCookie } from 'h3';

export const setCookieIfValue = (
  event: H3Event<EventHandlerRequest>,
  name: string,
  value: string | number | undefined | null,
  options?: Parameters<typeof setCookie>[3]
) => {
  if (value) setCookie(event, name, String(value), options);
};
