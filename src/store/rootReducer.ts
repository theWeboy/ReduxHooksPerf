/* eslint-disable @typescript-eslint/camelcase */
import { Action, Reducer } from 'redux';

interface filters {
  key: string;
  value: string;
}

export type ById = {
  [id: number]: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    ip_address: string;
  };
};

export interface InitialStateType {
  userId?: number;
  userData?: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    ip_address: string;
  };
  byId?: ById;
  filteredIds?: number[];
  filterCriteria?: string[];
}

export const initialState: InitialStateType = {
  userId: 1,
  userData: {
    id: 1,
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    ip_address: '',
  },
  byId: {
    1: {
      id: 1,
      first_name: '',
      last_name: '',
      email: '',
      gender: '',
      ip_address: '',
    },
  },
  filteredIds: [],
  filterCriteria: [],
};

export interface DispatchAction extends Action {
  type: 'UPDATE_USER' | 'ADD_USERS' | 'UPDATE_FILTER_CRITERIA' | 'UPDATE_FILTERED_IDS';
  payload: {
    userId?: number;
    userData?: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      gender: string;
      ip_address: string;
    };
    usersById?: {
      [id: number]: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        gender: string;
        ip_address: string;
      };
    };
    filteredIds?: number[];
    filterCriteria?: string[];
  };
}

function updateUser(state: InitialStateType, action: DispatchAction) {
  const { payload } = action;
  const { userId, userData } = payload;
  if (userId && userData) {
    const userByIds = state.byId;
    if (userByIds) userByIds[userId] = userData;
    return {
      ...state,
      byId: userByIds,
    };
  }
  return state;
}

function addUsers(state: InitialStateType, action: DispatchAction) {
  const { payload } = action;
  const { usersById } = payload;
  return {
    ...state,
    byId: usersById,
  };
}

export const rootReducer: Reducer<InitialStateType, DispatchAction> = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case 'UPDATE_USER': {
      return updateUser(state, action);
    }
    case 'ADD_USERS': {
      return addUsers(state, action);
    }
    case 'UPDATE_FILTER_CRITERIA': {
      return {
        ...state,
        filterCriteria: action.payload.filterCriteria,
      };
    }
    case 'UPDATE_FILTERED_IDS': {
      return {
        ...state,
        filteredIds: action.payload.filteredIds,
      };
    }
    default:
      return state;
  }
};
