/**
 * Core React Imports
 */
import React, { forwardRef, useEffect, useState } from "react";

/**
 * Helper React packages
 */
 import { v1 as uuidV4} from 'uuid';
 import { toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';

/**
 * Components Import
 */
import Note from "../note/note.component";
import Textarea from "../textarea/textarea.component";

/**
 * Adding API calls
 */
 import SaveNote from "../../../shared/API-interface/note.saveUpdate";
 import GetAllData from "../../../shared/API-interface/getAllData";

 /**
  * Constant Imports
 */
  import APPConstant from '../../../constants/app.constants';



/**
 * @param {empty} props 
 * @returns Note Container, TextArea, and Save Button
 * ref: the forwardRef method allows parent component to move down - used when we call 'new Note add'
 *      to create a newNote and update the noteDescription to text area and Note list
 * 
 */
const NoteList = forwardRef((props) => {
   
    /**
     * Declaring two new state variable, which we'll call "noteList" and "noteDescription"
     * noteList: conatins the list of node to render on the view
     * noteDescription: it contains any note selected from list or any new created
     */
    const [notesList, setnotesList] = useState([]);
    const [noteDescription, setNoteDescription] = useState({});
    
    // configuring toast congfiguration
    toast.configure();

//getting all the notes data to show
useEffect(() => {
      getallNotes();
 }, []);


 // adds new note 
const addNewNote = () => {
      noteHandler({description: APPConstant.newNoteDescription, uuid: uuidV4()})
}

//it updates the state of notesList which needs to be shown as list
const noteHandler = (note) => {
      setnotesList([...notesList, note]);
}

// updates the new/updated note description in the state variable
const noteUpdateonSave = (note) => {
       const index = note?.uuid ? 
                     notesList.findIndex((el) => el.uuid === note.uuid):
                     notesList.findIndex((el) => el._id === note._id);
       const tempArr = [...notesList];
       tempArr[index] = {...note};
       setnotesList(tempArr);
 } 

/**
 * update the text in the textarea on every user change event or when user 
 * selects the note from the list to update the textarea with slected note description
 */

 const textDescriptionHandler = (event, note) => {
   if (!note) {
    setNoteDescription({ ...noteDescription,description: event.target.value});
   } else {
    selectionColorSet(note);
    setNoteDescription(note);
   }
 }

// Not an efficient way to do it when data is large
 const selectionColorSet = (note) => {
  notesList.forEach(el => {
    if ((el.hasOwnProperty('_id') && el._id === note._id) || (note.hasOwnProperty('uuid') && el.uuid === note.uuid)) {
        note.selected = true;
     } else {
       el.selected = false;
     }
    })
 }

 // Saves/updates data to the DB
const noteSavedToDB = async () => {
  try {
    // if there is no description in the notes
    if (!noteDescription?.description) { 
        keepPlaceHolder();
        return;
    }

    // checking if the note needs to be saved or updated based on unique identifier
    // there could be other way of doing that too! Call API
    if (noteDescription.hasOwnProperty('_id')) {
      await SaveNote.udpateNote(noteDescription);
     } else {
     await SaveNote.saveNote(noteDescription);
     }

     // this updates the note list showing on view
     noteUpdateonSave(noteDescription);
     toast('Note Saved Successfully!');

  } catch (error) {
     alert(error);
     toast('Note not saved!')
  }
  
}

//Keep the description as a new note if user try to save empty note
const keepPlaceHolder = () => {
  const temp = noteDescription;
  temp.description = APPConstant.newNoteDescription;
  textDescriptionHandler(null, temp);
  toast('Please enter the note description to save it');
}

//API call to get all the noteList
const getallNotes = async () => {
    try {
          const allNotes = await GetAllData.getData()
          setnotesList(allNotes);
          if (allNotes.length > 0) textDescriptionHandler(null, allNotes[0]);
          // console.log(allNotes);
       } catch (error) {
        console.log(error);
      }
}

// if there is no note then we show the message 'No Notes Found!' else we show the Notes List
    if (notesList.length > 0) {
               return (
                 <>
                 <div className="add-btn">
                    <button onClick={() =>addNewNote()}>+</button>
                </div>
                 <div className="container">
                    <div className="notes">
                        <Note noteList={notesList} callback={textDescriptionHandler}/>
                    </div>

                 <Textarea value={noteDescription?.description} 
                           change={textDescriptionHandler} 
                           />

                 <div className="save-btn">
                      <button onClick={noteSavedToDB}>Save</button>
                 </div>
                 </div>
                 </>
        )
    } else {
      return <p className="NoNotes">No Notes Found!</p>
    }
})   

  
export default NoteList;