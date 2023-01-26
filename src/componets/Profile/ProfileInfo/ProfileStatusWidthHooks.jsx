import React, {useState} from 'react'


const ProfileStatusWidthHooks = (props) => {

    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    const activatedEditMode = () => {
        setEditMode(true)
    }

    const deactivatedEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activatedEditMode}>{props.status || '-----------'} </span>
                </div>
            }
            {editMode &&
            <div>
                <input autoFocus={true}
                       onBlur={deactivatedEditMode}
                       onChange={onStatusChange}
                       value={status}
                />
            </div>}
        </div>
    )
}

export default ProfileStatusWidthHooks