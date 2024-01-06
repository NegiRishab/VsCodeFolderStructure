 interface Mydata{
    type:string,
    name:string,
    id:string,
    parentid:null|string,
    childrenids?:string[]
 }
 
 const arr:Mydata[] = [
  {
    type: "folder",
    name: "root",
    id: "root",
    parentid: null,
    childrenids: ["hee", "beee"],
  },
  {
    type: "file",
    name: "rootfile",
    id: "rootfile",
    parentid: "root",
  },
  {
    type: "folder",
    name: "rootfolder",
    id: "rootfolder",
    parentid: "root",
    childrenids: [],
  },
  {
    type: "folder",
    name: "rootfolder1",
    id: "rootfolder1",
    parentid: "rootfolder",
    childrenids: [],
  },
];

export default arr;
