export interface IShoppingListItem {
  id: string;
  description: string;
  quantity?: string;
  details?: string;
  labels?: Array<string>;
  done: boolean
}

export interface IShoppingList {
  id: string;
  name: string;
  owner: string;
  items?: { [ key: string ]: IShoppingListItem }
}
