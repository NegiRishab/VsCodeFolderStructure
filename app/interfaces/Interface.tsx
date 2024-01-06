 export interface MyData {
    type: string;
    name: string;
    id: string;
    parentid: null | string;
    childrenids?: string[];
  }