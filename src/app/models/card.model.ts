export interface Card {
  id?: number;
  boardId?: number;
  name?: string;
  details?: string;
  important?: boolean;
  urgent?: boolean;
  system?: boolean;
  expectedCompletion?: string;
  status?: number;
  point?: number;
  members?: any[];
  cardComments?: any[];
  files?: any[];
  applicationUserId?: string;
  archivedBy?: any;
  archivedDate?: any;
  board?: any;
  createdBy?: any;
  createdDate?: any;
  deletedBy?: any;
  deletedDate?: any;
  isArchived?: any;
  isDeleted?: any;
  notifSubscriptionId?: any;
  private?: any;
  reschedules?: any;
  updatedBy?: any;
  updatedDate?: any;
}

export enum CardStatus {
  Later = 1,
  Today = 2,
  Doing = 3,
  Done = 4
}

export enum CardPoint {
  Easy = 1,
  Normal = 2,
  Complex = 3,
  Tricky = 4,
  Challenging = 5
}

export enum CardView {
  Thumbnail = 1,
  Listview = 2,
  Archived = 3
}