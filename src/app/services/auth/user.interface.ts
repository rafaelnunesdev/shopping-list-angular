export interface IUser  {
  accessibleLists: { [ key: string]: boolean },
  ownedLists: { [ key: string]: boolean },
}
