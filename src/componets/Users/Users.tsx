
import userPhoto from "../../assets/images/pngtree-users-vector-icon-png-image_3725294.jpg";
import React from "react";
import axios from "axios";
import {UsersPropsType} from "./UsersContainer";


class Users extends React.Component<UsersPropsType> {

        componentDidMount() {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                this.props.setUsers(response.data.items)})
        }


    render() {
        return <div>
            {this.props.usersPage.users.map((u) =>
                <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto}
                                 style={{width: '60px', height: '60px', borderRadius: '50%'}}/>
                        </div>

                        {u.followed
                            ? <button onClick={() => this.props.unfollow(u.id)}>Unfollow</button>
                            : <button onClick={() => this.props.follow(u.id)}>Follow</button>}
                    </span>
                    <div>
                        <div>
                            <span>{u.name}</span>
                            <span>{u.status}</span>
                        </div>
                        <div>
                            <span>{"u.location.country"}</span>
                            <span>{"u.location.city"}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    }
}

export default Users
