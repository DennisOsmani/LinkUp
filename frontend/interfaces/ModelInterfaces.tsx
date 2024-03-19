// LAGE ENUMS OGSÅ SIDEN DE BLIR SENDT SOM INT???

export interface User {
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

export interface Event {
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
  location: Location;
  eventRelations?: [];
}

export interface Location {
  locationID: number;
  address?: string;
  postalcode?: string;
  city: string;
  country: string;
}

export interface UserRelation {
  userRelationID: number;
  user_first_ID: string;
  user_fisrt?: User;
  user_second_ID: string;
  user_second?: User;
  userRelationType: number;
}

export interface eventRelations {
  eventRelationID: number;
  eventID: number;
  event?: Event;
  userID: string;
  user: User;
  eventRelationParticipation: number;
  eventRole: number;
}

export interface LogIn {}

export interface Register {}
