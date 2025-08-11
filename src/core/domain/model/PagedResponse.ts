export class PagedResponse<T> {
  Items!: T[];
  Total!: number;
  Page!: number;
  PageSize!: number;

  static Create<T>(items: T[], total: number, page: number, pageSize: number): PagedResponse<T> {
    return { Items: items, Total: total, Page: page, PageSize: pageSize };
  }
}
