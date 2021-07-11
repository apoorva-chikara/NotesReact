import { useState } from "react";

/**
 * 
 * @param {noteList, callback} props 
 * @returns React element (List of notes)
 * noteList: it contains the list of notes
 * callback: pass the currente slected note details to the Note-List component
 */
export default function Note (props) {
   const { noteList, callback } = props;
   console.log(noteList);
   const listItems = noteList.map((note, index) =>
    <ListNote note={note} callback={callback} key={index}/>
  );
   return (
       <ul className="nav">
            {listItems}
       </ul>  
   )
}

/**
 * 
 * @param {note, callback} props 
 * @returns React element(Note list with attached handler onClick)
 * note: contains the 
 */
const ListNote = (props) => {
  const { note, callback } = props;

  console.log(note);
  // const changeColor = (_id) => {
  // console.log('in changeCO')
  //       setSelected(_id);
  // };
  // changeColor(note._id)

  return (<li onClick={() => { callback(null, note); }} 
              key={note?._id ? note._id : note.uuid}
              style={{backgroundColor:  note.selected ? 'grey' : ''}}
          >
         {note.description}
         </li>);
}