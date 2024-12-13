import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export interface User {
  id: number
  name: string
  email: string
  status: 'active' | 'inactive'
  region: string
  joinDate: string
}

interface UserState {
  users: User[]
  loading: boolean
  error: string | null
  currentPage: number
  totalPages: number
  searchTerm: string
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  searchTerm: '',
}

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ page, search }: { page: number; search?: string }) => {
    // Mock API call
    const response = await new Promise<{ users: User[]; totalPages: number }>((resolve) => {
      setTimeout(() => {
        const mockUsers: User[] = Array.from({ length: 20 }, (_, i) => ({
          id: i + 1,
          name: `User ${i + 1}`,
          email: `user${i + 1}@example.com`,
          status: i % 3 === 0 ? 'inactive' : 'active',
          region: ['North', 'South', 'East', 'West'][i % 4],
          joinDate: new Date(2023, i % 12, i + 1).toISOString(),
        }))

        const filteredUsers = search
          ? mockUsers.filter(
              (user) =>
                user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase())
            )
          : mockUsers

        const perPage = 5
        const start = (page - 1) * perPage
        const paginatedUsers = filteredUsers.slice(start, start + perPage)

        resolve({
          users: paginatedUsers,
          totalPages: Math.ceil(filteredUsers.length / perPage),
        })
      }, 1000)
    })
    return response
  }
)

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
      state.currentPage = 1
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload.users
        state.totalPages = action.payload.totalPages
        state.loading = false
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch users'
      })
  },
})

export const { setSearchTerm, setCurrentPage } = userSlice.actions
export default userSlice.reducer 