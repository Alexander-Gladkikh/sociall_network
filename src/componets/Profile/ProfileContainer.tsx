import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import {compose} from "redux";


class ProfileContainer extends React.Component<any> {

    componentDidMount() {
        // debugger
        let profileId = this.props.router.params.profileId
        if (!profileId) {
            profileId = this.props.authorizedUserId;
        }
        this.props.getUserProfile(profileId)
        //getUserProfile(profileId)
        this.props.getStatus(profileId)


    }

    render() {

        return <div>
            <Profile {...this.props} profile={this.props.profile} status={this.props.status}
                     updateStatus={this.props.updateStatus}/>
        </div>
    }
}


const mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id,
        isAuth: state.auth.isAuth
    }
}

// wrapper to use react router's v6 hooks in class component(to use HOC pattern, like in router v5)
function withRouter(Component: any) {
    function ComponentWithRouterProp(props: any) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />
        );
    }

    return ComponentWithRouterProp;
}

//setUsersProfile

export default connect(mapStateToProps, {getUserProfile, getStatus, updateStatus})(compose(
    withRouter,
    //widthAuthRedirect
)(ProfileContainer));


