import type { RequiredBy } from './custom-generic';

export interface UpdateSettingsParamsProps {
  id: string;
  name?: string;
  enabled?: boolean;
  homeUrl?: string;
  lunchUrl?: string;
  lunchRegex?: string;
  weeklyRegex?: string;
}

export type CreateRestaurantParamsProps = RequiredBy<
  Omit<UpdateSettingsParamsProps, 'id'>,
  'name' | 'homeUrl' | 'lunchUrl'
>;

export interface DeleteRestaurantParamsProps {
  id: string;
}
