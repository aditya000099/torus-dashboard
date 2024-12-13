import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, setSearchTerm, setCurrentPage } from '@/store/slices/userSlice'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { RootState } from '@/store'

const UserManagement = () => {
  const dispatch = useDispatch()
  const { users, loading, error, currentPage, totalPages, searchTerm } = useSelector(
    (state: RootState) => state.users
  )

  useEffect(() => {
    dispatch(fetchUsers({ page: currentPage, search: searchTerm }) as any)
  }, [dispatch, currentPage, searchTerm])

  const handleSearch = (value: string) => {
    dispatch(setSearchTerm(value))
  }

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Input
          type="search"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Join Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>{user.region}</TableCell>
              <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center space-x-2">
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default UserManagement 