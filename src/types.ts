export type TimelineItem = {
  id: number;
  title: string;
  description: string;
  dateFrom: string;
  dateTo: string;
  content: {
    year: number;
    description: string;
  }[];
};
