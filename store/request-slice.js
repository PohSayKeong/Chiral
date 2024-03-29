import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "request",
    initialState: {
        availableRequests: [],
        myCurrentRequests: [],
        myPastRequests: [],
        myReportedRequests: [],
        reportedRequests: [],
        viewData: null,
        filterData: [],
    },
    reducers: {
        setRequests(state, action) {
            state.availableRequests = action.payload.availableRequests;
            state.myCurrentRequests = action.payload.myCurrentRequests;
            state.myReportedRequests = action.payload.myReportedRequests;
            state.myPastRequests = action.payload.myPastRequests;
            state.reportedRequests = action.payload.reportedRequests;
        },
        setViewData(state, action) {
            state.viewData = action.payload;
        },
        setFilterData(state, action) {
            state.filterData = action.payload;
        },
    },
});

export const requestActions = requestSlice.actions;

export default requestSlice;
