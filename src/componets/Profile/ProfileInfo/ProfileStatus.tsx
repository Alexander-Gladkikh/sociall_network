import React from "react";
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/preloader/Preloader";


class ProfileStatus extends React.Component<any, any> {

    state = {
        editMode: true
    }
    activateEditMode () {
        this.setState(
            {editMode: false}
        )
    }
    deactivateEditMode() {
        this.setState(
            {editMode: true}
        )
    }


    render() {
        return <div>
            {this.state.editMode
                ?
                <div>
                    <span onDoubleClick={this.activateEditMode.bind(this)}>Hello new User</span>
                 </div>
                :
                <div>
                    <input autoFocus type="text" onBlur={this.deactivateEditMode.bind(this)}></input>
                </div>
            }


        </div>
    }
}

export default ProfileStatus