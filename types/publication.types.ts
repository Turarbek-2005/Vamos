export interface IBaseField {
    $createdAt: string;
    $id: string;
}
  
export interface IComment extends IBaseField {
    text: string;
    name:string;
    avatar: string;
}
  
export interface IPublication extends IBaseField {
    comments: IComment[];
    name: string;
}
  