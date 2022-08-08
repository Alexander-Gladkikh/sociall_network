import React from "react";

export const AddMessage: React.FC = () => {
    let newMessageElement: any = React.createRef()
    let addMessage = () => {
        let message = newMessageElement.current.value
        alert(message)
    }
    return (
        <div>
            <textarea ref={newMessageElement}></textarea>
            <button onClick={addMessage}>Add Message</button>
        </div>

    )
}