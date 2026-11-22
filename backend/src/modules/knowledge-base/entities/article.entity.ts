export interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  views: number;
  authorId?: string;
  companyId?: string;
  createdAt: Date;
  updatedAt: Date;
}
