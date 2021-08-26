import { createAction, createReducer, configureStore } from '@reduxjs/toolkit'
import Scheduling from '../SchedulingApp.js'


const addAction = createAction('member/add')
const deleteAction = createAction('member/delete')
const updateAction = createAction('member/update')

// used to add member's name and color
function actionAdd (name, color) {
    return {
        type: addAction.type,
        payload: {
            name: name,
            color: color,
        }
    }
}
// used to delete member's id
function actionDelete (memberId) {
    return {
        type: deleteAction.type,
        payload: {
            id: memberId,
        }
    }
}
// used to update the members
function actionUpdate (memberId, changeset) {
    return {
        type: updateAction,
        payload: {
            id: memberId,
            changeset: changeset.type,
        }
    }
}

const MemberState = { latestmemberid: 1, members: {} }

// reducer carries out the 3 actions (add, delete, update)
const memberReducer = createReducer(MemberState, (builder) => {
    builder
        // adding a member will update the data by adding a new member
        .addCase(addAction, (state, action) => {
            let memberId = state.latestmemberid;
            let name = action.payload.name;
            let color = action.payload.color;
            let newMember = Scheduling.members.createMember(memberId, name, color);

            state.members[memberId] = newMember;

            state.latestmemberid += 1
        })
        // deleting a member will update the data by deleting a member specified by its id
        .addCase(deleteAction, (state, action) => {
            let memberid = action.payload.id;
            delete state.members[memberid];
        })
        // updating something about a member will update the data by updating specified feature
        .addCase(updateAction, (state, action) => {
            let memberid = action.payload.id;
            state.members[memberid] = Object.assign(state.members[memberid], action.payload.changeset);
        })
})
// Renaming the actions (like a dictionary) so that it has the payload (the changes themselves) when we export the functions that make the payloads
// This makes the payloads public so that it's easier to use them without having to create additional structures
const modules = {
    reducer: memberReducer,
    addAction: actionAdd,
    deleteAction: actionDelete,
    updateAction: actionUpdate
}

export default modules