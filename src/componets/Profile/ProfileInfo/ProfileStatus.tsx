import React from "react";
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/preloader/Preloader";


class ProfileStatus extends React.Component<any, any> {

    state = {
        editMode: true,
        status: this.props.status
    }
    activateEditMode = () => {
        this.setState(
            {editMode: false}
        )
    }
    deactivateEditMode = () => {
        this.setState(
            {editMode: true}
        )
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e: any) => {
        this.setState({
                status: e.currentTarget.value
            }
        )
    }


    render() {
        return <div>
            {this.state.editMode
                ?
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.state.status || 'No status'}</span>
                </div>
                :
                <div>
                    <input onChange={this.onStatusChange} autoFocus type="text" onBlur={this.deactivateEditMode}
                           value={this.state.status}></input>
                </div>
            }


        </div>
    }
}

export default ProfileStatus