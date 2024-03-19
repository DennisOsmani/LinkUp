// LAGE ENUMS OGSÅ SIDEN DE BLIR SENDT SOM INT???
export interface IToken {
  token: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegistrationRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface IUser {
  userID: string;
  firstname: string;
  lastname: string;
  dateBorn: string;
  phone?: string;
  RelationshipStatus?: number;
  gender?: string;
  description?: string;
  email?: string;
  profileImage?: string;
  password?: string;
  salt?: string;
  eventsCreated?: number;
  eventsJoined?: number;
  role?: number;
  userRelationsAsFirst?: [];
  userRelationsAsSecond?: [];
  eventRelations?: [];
}

export interface IEvent {
  eventID: number;
  eventName: string;
  eventDescription: string;
  eventDateTimeStart: string;
  eventDateTimeEnd: string;
  visibility: number;
  inviteURL: string;
  frontImage?: string;
  minCapacity?: string;
  maxCapacity?: string;
  locationID: number;
  location: ILocation;
  eventRelations?: [];
}

export interface ILocation {
  locationID: number;
  address?: string;
  postalcode?: string;
  city: string;
  country: string;
}

export interface IUserRelation {
  userRelationID: number;
  user_first_ID: string;
  user_fisrt?: IUser;
  user_second_ID: string;
  user_second?: IUser;
  userRelationType: number;
}

export interface IEventRelations {
  eventRelationID: number;
  eventID: number;
  event?: IEvent;
  userID: string;
  user: IUser;
  eventRelationParticipation: number;
  eventRole: number;
}

export enum UserRelationType {
  PENDING_FIRST_SECOND,
  PENDING_SECOND_FIRST,
  FRIENDS,
  BLOCKED_FIRST_SECOND,
  BLOCKED_SECOND_FIRST,
}

export interface IUserRelationDTO {
  userId: string;
  otherUserId: string;
  type: UserRelationType;
}
