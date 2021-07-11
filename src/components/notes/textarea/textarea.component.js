/**
 * 
 * @param {value, change} props 
 * @returns Textarea
 * value: the note description we need to show
 * change: whenever we change any values in the textbox, we can a parent method to update the state of note 
 *         that user is typing in.
 * Shows the text area where user can update the note descption
 */

/**
 * Constant imports 
 */

import APPConstant from '../../../constants/app.constants';

export default function Textarea (props) {
    const { value, change: updateTextArea } = props;
    console.log(props);

    // helps to select the placeholder only for new notes added
    const selectAllText = (event) => {
        if (event.target.value === APPConstant.newNoteDescription) {
          event.target.select();
        }
      };

    return  (<div className="textarea">
    <textarea
              value={value} 
              onChange={updateTextArea} 
              onClick={selectAllText} />
    </div>)
}

