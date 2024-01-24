"use client";

import { useEffect, useState } from "react";
import Folder from "../component/Folder";

import data from "../index";
import { MyData } from "../interfaces/Interface";

export default function Home() {
  const [maindata, setMaindata] = useState<MyData[]>(data);
  const [parentdata, setparentdata] = useState<MyData>({
    type:'',
    name:'',
    id: '',
    parentid: null
  });
const handlemainData=(data:MyData)=>{
   let data1=[...maindata];
   data1.push(data)
   setMaindata(data1)
}
  useEffect(() => {
    let getfilterdata = maindata.find((i) => i.parentid === null);
    setparentdata(getfilterdata?getfilterdata:parentdata);
  }, [maindata]);
  return (
    <div>
    
  <h1 className="text-center font-bold">This is vs Code Folder Structure Click on it and Add folder and files</h1>
      <Folder folderdata={parentdata} maindata={maindata} handlemainData={handlemainData}/>
  
    </div>
  );
}
