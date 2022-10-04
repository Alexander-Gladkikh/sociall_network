import userPhoto from "../../assets/images/pngtree-users-vector-icon-png-image_3725294.jpg";
import React from "react";
import axios from "axios";
import {UsersPropsType} from "./UsersContainer";
import s from './Users.module.css'

class Users extends React.Component<UsersPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
            //this.props.setTotalUserCount(response.data.totalCount)
        })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
        })
    }

    render() {

        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }

        return <div>
            {pages.map(p => <span className={this.props.currentPage === p ? s.selectedPage : ''}
                                  onClick={() => this.onPageChanged(p)}>{p}</span>)}

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
