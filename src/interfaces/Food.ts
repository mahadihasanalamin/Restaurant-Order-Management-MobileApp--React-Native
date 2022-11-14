export default interface Food {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  price: number;
  quantity?: number;
  category?: string;
  addonType?: string;
  cid?: string;
}
