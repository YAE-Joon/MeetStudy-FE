interface Content {
  nickName: string;
  content: string;
  createdAt: string;
}

interface Sort {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  cursor: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface ChatRecordsResponse {
  content: Content[];
  pageable?: Pageable;
  totalPages?: number;
  totalElements?: number;
  last?: boolean;
  size?: number;
  number?: number;
  sort?: Sort;
  numberOfElements?: number;
  first?: boolean;
  empty?: boolean;
}
