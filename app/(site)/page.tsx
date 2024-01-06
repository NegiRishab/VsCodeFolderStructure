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
   let data1=Array.from(maindata);
   data1.push(data)
   setMaindata(data1)
}
  useEffect(() => {
    let getfilterdata = maindata.find((i) => i.parentid === null);
    console.log(getfilterdata)
    setparentdata(getfilterdata?getfilterdata:parentdata);
  }, [maindata]);
  return (
    <div>
      <Folder folderdata={parentdata} maindata={maindata} handlemainData={handlemainData}/>
    </div>
  );
}
