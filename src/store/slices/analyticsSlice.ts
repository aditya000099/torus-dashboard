// @ts-nocheck
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface AnalyticsData {
  metrics: {
    totalUsers: number
    activeUsers: number
    deletedUsers: number
  }
  registrationTrend: Array<{ date: string; count: number }>
  usersByStatus: Array<{ status: string; count: number }>
  usersByRegion: Array<{ region: string; count: number }>
}

interface AnalyticsState {
  metrics: {
    totalUsers: number
    activeUsers: number
    deletedUsers: number
  }
  registrationTrend: Array<{ date: string; count: number }>
  usersByStatus: Array<{ status: string; count: number }>
  usersByRegion: Array<{ region: string; count: number }>
  loading: boolean
  error: string | null
  dateRange: {
    start: string
    end: string
  }
  selectedRegion: string | null
}

const initialState: AnalyticsState = {
  metrics: {
    totalUsers: 0,
    activeUsers: 0,
    deletedUsers: 0,
  },
  registrationTrend: [],
  usersByStatus: [],
  usersByRegion: [],
  loading: false,
  error: null,
  dateRange: {
    start: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
    end: new Date().toISOString(),
  },
  selectedRegion: null,
}

export const fetchAnalytics = createAsyncThunk<
  AnalyticsData,
  { dateRange: { start: string; end: string }; region?: string }
>('analytics/fetchAnalytics', async ({ dateRange, region }) => {
  // Mock API call
  const response = await new Promise<AnalyticsData>((resolve) => {
    setTimeout(() => {
      resolve({
        metrics: {
          totalUsers: 1000,
          activeUsers: 750,
          deletedUsers: 50,
        },
        registrationTrend: Array.from({ length: 6 }, (_, i) => ({
          date: new Date(2023, i, 1).toISOString(),
          count: Math.floor(Math.random() * 100) + 50,
        })),
        usersByStatus: [
          { status: 'Active', count: 750 },
          { status: 'Inactive', count: 250 },
        ],
        usersByRegion: [
          { region: 'North', count: 300 },
          { region: 'South', count: 250 },
          { region: 'East', count: 200 },
          { region: 'West', count: 250 },
        ],
      })
    }, 1000)
  })
  return response
})

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setDateRange: (state, action) => {
      state.dateRange = action.payload
    },
    setSelectedRegion: (state, action) => {
      state.selectedRegion = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.metrics = action.payload.metrics
        state.registrationTrend = action.payload.registrationTrend
        state.usersByStatus = action.payload.usersByStatus
        state.usersByRegion = action.payload.usersByRegion
        state.loading = false
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch analytics'
      })
  },
})

export const { setDateRange, setSelectedRegion } = analyticsSlice.actions
export default analyticsSlice.reducer 