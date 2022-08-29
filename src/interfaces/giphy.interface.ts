interface IGiphyResponse {
  data: IGifData[];
  pagination: IPagination;
  meta: IMeta;
}

interface IGifData {
  type: string;
  id: string;
  url: string;
  slug: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  title: string;
  rating: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  is_sticker: number;
  import_datetime: string;
  trending_datetime: string;
  images: IImages;
  user?: IUser;
  analytics_response_payload: string;
  analytics: IAnalytics;
}

interface IPagination {
  total_count: number;
  count: number;
  offset: number;
}

interface IMeta {
  status: number;
  msg: string;
  response_id: string;
}

interface IImages {
  original: IDetailedImage;
  downsized: IImage;
  downsized_large: IImage;
  downsized_medium: IImage;
  downsized_small: IDetailedMp4;
  downsized_still: IImage;
  fixed_height: IDetailedImage;
  fixed_height_downsampled: IDetailedImage;
  fixed_height_small: IDetailedImage;
  fixed_height_small_still: IImage;
  fixed_height_still: IImage;
  fixed_width: IDetailedImage;
  fixed_width_downsampled: IDetailedImage;
  fixed_width_small: IDetailedImage;
  fixed_width_small_still: IImage;
  fixed_width_still: IImage;
  looping: IMp4;
  original_still: IImage;
  original_mp4: IDetailedMp4;
  preview: IDetailedMp4;
  preview_gif: IImage;
  preview_webp: IImage;
  "480w_still": IImage;
  hd?: IDetailedMp4;
  "4k"?: IDetailedMp4;
}

interface IImage {
  height: string;
  width: string;
  size?: string;
  url: string;
  mp4?: string;
}

interface IDetailedImage extends IImage {
  mp4_size?: string;
  mp4?: string;
  webp_size: string;
  webp: string;
  frames?: string;
  hash?: string;
}

interface IMp4 {
  mp4_size?: string;
  mp4: string;
}

interface IDetailedMp4 extends IMp4 {
  height: string;
  width: string;
  url?: string;
}

interface IUser {
  avatar_url: string;
  banner_image: string;
  banner_url: string;
  profile_url: string;
  username: string;
  display_name: string;
  description: string;
  instagram_url: string;
  website_url: string;
  is_verified: boolean;
}

interface IAnalytics {
  onload: IAnalyticsEvent;
  onclick: IAnalyticsEvent;
  onsent: IAnalyticsEvent;
}

interface IAnalyticsEvent {
  url: string;
}

export type { IGiphyResponse, IGifData, IImages };
