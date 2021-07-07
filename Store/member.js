import { createAction, createReducer, configureStore } from '@reduxjs/toolkit'
import Scheduling from '../SchedulingApp.js'


const addAction = createAction('member/add')
const deleteAction = createAction('member/delete')
const updateAction = createAction('member/update')

function actionAdd (name, color) {
    return {
        type: addAction.type,
        payload: {
            name: name,
            color: color,
        }
    }
}

function actionDelete (id) {
    return {
        type: deleteAction.type,
        payload: {
            id: id,
        }
    }
}

function actionUpdate (id, changeset) {
    return {
        type: updateAction,
        payload: {
            id: id,
            changeset: changeset.type,
        }
    }
}

const MemberState = { latestmemberid: 1, members: {} }

const memberReducer = createReducer(MemberState, (builder) => {
    builder
        .addCase(addAction, (state, action) => {
            let memberId = state.latestmemberid;
            let name = action.payload.name;
            let color = action.payload.color;
            let newMember = Scheduling.members.createMember(memberId, name, color);

            state.members[memberId] = newMember;

            state.latestmemberid += 1
        })
        .addCase(deleteAction, (state, action) => {
            let memberid = action.payload.id;
            delete state.members[memberid];
        })
        .addCase(updateAction, (state, action) => {
            let memberid = action.payload.id;
            state.members[memberid] = Object.assign(state.members[memberid], action.payload.changeset);
        })
})

const modules = {
    reducer: memberReducer,
    addAction: actionAdd,
    deleteAction: actionDelete,
    updateAction: actionUpdate
}


export default modules