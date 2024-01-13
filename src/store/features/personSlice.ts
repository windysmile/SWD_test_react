import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IPerson, IPersonLists } from '../../interfaces/person'

const initialState: IPersonLists = {
  persons: []
}

export const personSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    updatePerson: (state, action: PayloadAction<IPerson>) => {
      const findIndex = state.persons.findIndex((e) =>e.key === action.payload.key);
      if(findIndex === -1){
        state.persons.push(action.payload);
      }else{
        state.persons[findIndex] = action.payload;
      }
    },
    deletePerson: (state, action: PayloadAction<string[]>) => {
      action.payload.map((key) => {
        const findIndex = state.persons.findIndex((e) => e.key === key)
        state.persons.splice(findIndex, 1)
      })
    }
  },
})

export const { updatePerson, deletePerson } = personSlice.actions
export default personSlice.reducer