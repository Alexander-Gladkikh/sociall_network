import React, {ChangeEvent, useEffect, useState} from 'react'

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}
const ProfileStatusWidthHooks: React.FC<PropsType> = (props) => {

    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    useEffect(() => {
       setStatus(props.status)
    }, [props.status])

    const activatedEditMode = () => {
        setEditMode(true)
    }

    const deactivatedEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
                <div>
                   <b>status :</b> <span onDoubleClick={activatedEditMode}>{props.status || '-----------'} </span>
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