import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: false,
  stakes: []
};

export const slice = createSlice({
  name: 'staking',
  initialState,
  reducers: {
    // START LOADING
    startLoading: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    // HAS ERROR
    hasError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload !== null;
    },
    // GET STAKES
    getStakesSuccess(state, action) {
      state.isLoading = false;
      state.error = false;
      state.stakes = action.payload || [];
    },
    // GET STAKES
    createStakeSuccess(state, action) {
      state.isLoading = false;
      state.error = false;
      console.log(action.payload);
      state.stakes.push(action.payload);
    },
    updateStakingPot(state, action) {
      state.isLoading = false;
      state.error = false;
      const { id, status } = action.payload;
      const stake = state.stakes.find((s) => s.id === id);
      if (stake) stake.status = status;
    }
  }
});

// Action creators are generated for each case reducer function
export const { updateStakingPot } = slice.actions;

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
export function getStakes() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await http.get('/avize/ipoteci-mobiliare');
      dispatch(slice.actions.getStakesSuccess([]));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createStake(stake) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(slice.actions.createStakeSuccess(stake));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateStakeStatus(status, id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(slice.actions.updateStakingPot(status, id));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
