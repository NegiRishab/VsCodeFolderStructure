import React, { HtmlHTMLAttributes, useEffect, useState } from "react";

import { MyData } from "../interfaces/Interface";

interface MyProps {
  folderdata: MyData;
  maindata: MyData[];
  handlemainData: (data: MyData) => void;
}
const Folder: React.FC<MyProps> = ({
  folderdata,
  maindata,
  handlemainData,
}) => {

  const [isopen, setopen] = useState<boolean>(false);
  const [isFolderopen, setfolderOpen] = useState<boolean>(false);
  const [foldername, setFolderName] = useState<string>("");
  const [isFileopen, setfileOpen] = useState<boolean>(false);
  const [filename, setFileName] = useState<string>("");
  const [myChildrens, setMyChildrens] = useState<MyData[]>([]);
  const hanldeOpenChildren = (id: string) => {
    let data = maindata.filter((i) => i.parentid === id);
    setMyChildrens(data);
    setopen(!isopen);
  };

  const handlefolderName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
  };
  const handleFileName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };
  const handleAddfile = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: string
  ) => {
    if (e.key === "Enter") {
      handlemainData({
        type: "file",
        name: filename,
        id: filename,
        parentid: id,
        childrenids: [],
      });
      setFileName("");
      setfileOpen(false)
    }
  };
  const handleFolder = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: string
  ) => {
    if (e.key === "Enter") {
      handlemainData({
        type: "folder",
        name: foldername,
        id: foldername,
        parentid: id,
        childrenids: [],
      });
      setFolderName("");
      setfolderOpen(false)
    }
  };
useEffect(()=>{
  let data = maindata.filter((i) => i.parentid ===folderdata.id);
  setMyChildrens(data);
},[maindata])
  return (
    <>
      <div style={{ margin: "10px 20px" }}>
        
        {folderdata && (
          <div>
            <span onClick={() => hanldeOpenChildren(folderdata.id)}>
              {" "}
              📂 {folderdata.name}
            </span>
          {isopen
           &&  
            <div className="flex w-36 justify-between">
              <button style={{backgroundColor:'lightcyan'}} onClick={() => setfolderOpen(!isFolderopen)} className="border border-black rounded-lg bg-lightgray pl-1 pr-1  text-sm text-base">
                {" "}
                AddFolder
              </button>
              <button  style={{backgroundColor:'lightcyan'}} onClick={() => setfileOpen(!isFileopen)}  className="border border-black rounded-lg bg-lightgray pl-1 pr-1 text-sm text-base"> Addfile</button>
            </div>}
          </div>
        )}

        {isFolderopen && (
          <input
            type="text"
            value={foldername}
            onChange={(e) => handlefolderName(e)}
            onKeyDown={(e) => handleFolder(e, folderdata.id)}
            className="border border-black mt-1 p-1"
          />
        )}
        {isFileopen && (
          <input
            type="text"
            value={filename}
            onChange={(e) => handleFileName(e)}
            onKeyDown={(e) => handleAddfile(e, folderdata.id)}
            className="border border-black mt-1 p-1"
          ></input>
        )}
      </div>

      {isopen && (
        <div style={{ margin: "10px 20px" }}>
          {/* Folder Section */}
          <div>
            {myChildrens.map((child) => {
              return (
                <div key={child.id}>
                  {child.type === "folder" && (
                    <Folder
                      folderdata={child}
                      maindata={maindata}
                      handlemainData={handlemainData}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* File Section */}
          <div>
            {myChildrens.map((child) => {
              return (
                <div key={child.id} style={{ margin: "10px 20px" }}>
                  {child.type === "file" && <span>📝{child.name}</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
export default Folder;
