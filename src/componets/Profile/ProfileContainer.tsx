import React from "react";
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {getUserProfile, setUsersProfile} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {
    Navigate,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import {widthAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


class ProfileContainer extends React.Component<any>  {

    componentDidMount() {
       // debugger
        let profileId = this.props.router.params.profileId
        if(!profileId) {
            profileId = 2;
        }
        getUserProfile(profileId)
    }

    render () {

       return <div>
            <Profile {...this.props} profile={this.props.profile}/>
        </div>
    }
}





const mapStateToProps = (state: AppStateType)  => {
    return {
        profile: state.profilePage.profile,
    }
}

// wrapper to use react router's v6 hooks in class component(to use HOC pattern, like in router v5)
function withRouter(Component:  any) {
    function ComponentWithRouterProp(props: any) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}

setUsersProfile

export default connect(mapStateToProps, {setUsersProfile})(compose(
    withRouter,
    //widthAuthRedirect
)(ProfileContainer));


