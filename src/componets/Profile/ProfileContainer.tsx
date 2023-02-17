import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, updateStatus} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import {compose} from "redux";


class ProfileContainer extends React.Component<any> {

    refreshProfile() {
        let profileId = this.props.router.params.profileId
        if (!profileId) {
            profileId = this.props.authorizedUserId;
            if (!profileId) {
                this.props.router.location.pathname = '/login'
            }
        }
        this.props.getUserProfile(profileId)
        this.props.getStatus(profileId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.router.params.profileId != prevProps.router.params.profileId) {
            this.refreshProfile()
        }

    }

    render() {

        return <div>
            <Profile {...this.props}
                isOwner={!this.props.router.params.profileId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
            savePhoto={this.props.savePhoto}
            />
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
export function withRouter(Component: any) {
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

export default connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto})(compose(
    withRouter,
    //widthAuthRedirect
)(ProfileContainer));


