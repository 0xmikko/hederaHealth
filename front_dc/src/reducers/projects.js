import * as projects from '../actions/actions'
import * as status from '../config'
import { updateState } from "../utils/updateState";

const initialProject = {
    projectName: "loading...",
    projectSnippet: "loading...",
    projectDescription: "Loading...",
    projectWhitepaperLink: "loading...",
    ProjectMVP: 0,
    projectRating: "loading...",
    projectCountry: "loading...",
    crowdsaleSoftcap: "loading...",
    crowdsaleHardcap: "loading...",
    crowdsaleRaised: "loading...",
    crowdsaleTokenPrice: "loading...",
    crowdsaleStartTime: "loading",
    crowdsaleFinishTime: "loading...",
    crowdsaleContract: "loading...",
    tokenName: "loading...",
    tokenSymbol: "loading...",
    tokenDecimals: "loading...",
    tokenMintable: false,
    icon: 'http://127.0.0.1:8000/images/9/icon/'
}

const initialState = {

    projects: {

    }

  }

export default (state=initialState, action) => {

    let updated_projects;

    switch (action.type) {

        case projects.DATA_REQUEST:
            updated_projects = Object.assign({}, state.projects)
            updated_projects[action.payload.tokenContractAddress] = {

                status: status.STATUS_LOADING,
                data: {
                    ...initialProject,
                    tokenContractAddress: action.payload.tokenContractAddress
                }
            }

            return state; //updateState(state, { projects: updated_projects })

        case projects.DATA_SUCCESS:
            updated_projects = Object.assign({}, state.projects)
            updated_projects[action.payload.tokenContractAddress] = {
                   status: status.STATUS_SUCCESS,
                   data: action.payload }

            return updateState(state, { projects: updated_projects })

        //Should be improved later
        case projects.DATA_FAILURE:
            return state;

        default:
            return state;

    }
}

export const getProjectData = (state) => state.projects
