/**
 * React core Imports
 */
 import { useRef } from "react";
/**
 * Components Imports
 */
import NoteList from "../notes/note-list/note-list.component";

/**
 * 
 * @param {empty} props 
 * @returns HomePage and NodeList
 */
const HomePage = () => {

   return (
       <div className="mainpage">
         <div className="heading">
                    
                <div className="title">
                    <span>My awesome Notepad</span>
                </div>
         </div>
        <div className="lineBreak">
            <hr size="10px" width="750px" color="black" />  
        </div>
        <NoteList />
       </div>
   )
}

export default HomePage;