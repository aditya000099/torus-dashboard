import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAnalytics } from '@/store/slices/analyticsSlice'
import { Users, UserCheck, UserMinus } from 'lucide-react'
import { OverviewCard } from '@/components/analytics/overview-card'
import { TrendChart } from '@/components/analytics/trend-chart'
import { StatusChart } from '@/components/analytics/status-chart'
import { RegionChart } from '@/components/analytics/region-chart'
import { ChartDateRange } from '@/layouts/ChartDateRange'
import type { RootState } from '@/store'

const Analytics = () => {
  const dispatch = useDispatch()
  const {
    metrics,
    registrationTrend,
    usersByStatus,
    usersByRegion,
    loading,
    error,
    dateRange,
  } = useSelector((state: RootState) => state.analytics)

  useEffect(() => {
    dispatch(fetchAnalytics({ dateRange }) as any)
  }, [dispatch, dateRange])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <OverviewCard
          title="Total Users"
          value={metrics.totalUsers}
          icon={<Users className="h-4 w-4" />}
        />
        <OverviewCard
          title="Active Users"
          value={metrics.activeUsers}
          icon={<UserCheck className="h-4 w-4" />}
        />
        <OverviewCard
          title="Deleted Users"
          value={metrics.deletedUsers}
          icon={<UserMinus className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TrendChart title="Registration Trend" data={registrationTrend} />
        <StatusChart title="Users by Status" data={usersByStatus} />
      </div>

      <RegionChart title="Users by Region" data={usersByRegion} />
      <ChartDateRange />
    </div>
  )
}

export default Analytics 