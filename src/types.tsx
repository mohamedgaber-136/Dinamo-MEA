export type ItemType = {
    userId: number;
    id: number;
    title:string; 
    body: string;
  };
export type AddItemResponse = {
    success: boolean; // Indicates whether the addition was successful
    message?: string; // Optional message from the server
    item?: ItemType; // The added item details, if applicable
};