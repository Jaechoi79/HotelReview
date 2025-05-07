"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getReviews, deleteReview } from "@/lib/reviews"
import { getUsers, deleteUser } from "@/lib/users"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Trash2, User, Star, Hotel } from "lucide-react"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("reviews")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<{ id: string; type: "review" | "user" } | null>(null)
  const { user, isAdmin } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useLanguage()

  const reviews = getReviews()
  const users = getUsers()

  useEffect(() => {
    // Redirect if not admin
    if (!isAdmin()) {
      router.push("/")
    }
  }, [isAdmin, router])

  const handleDelete = () => {
    if (!itemToDelete) return

    if (itemToDelete.type === "review") {
      deleteReview(itemToDelete.id)
      toast({
        title: t.success,
        description: t.reviewDeletedSuccessfully,
      })
    } else {
      deleteUser(itemToDelete.id)
      toast({
        title: t.success,
        description: t.userDeletedSuccessfully,
      })
    }

    setDeleteDialogOpen(false)
    setItemToDelete(null)
  }

  const confirmDelete = (id: string, type: "review" | "user") => {
    setItemToDelete({ id, type })
    setDeleteDialogOpen(true)
  }

  if (!isAdmin()) {
    return null
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{t.adminDashboard}</CardTitle>
          <CardDescription>{t.manageReviewsAndUsers}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Hotel className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t.totalReviews}</p>
                    <h3 className="text-2xl font-bold">{reviews.length}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t.totalUsers}</p>
                    <h3 className="text-2xl font-bold">{users.length}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t.averageRating}</p>
                    <h3 className="text-2xl font-bold">
                      {reviews.length > 0
                        ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
                        : "N/A"}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="reviews">{t.reviews}</TabsTrigger>
          <TabsTrigger value="users">{t.users}</TabsTrigger>
        </TabsList>

        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>{t.allReviews}</CardTitle>
              <CardDescription>{t.manageAllReviews}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">{t.hotelName}</th>
                      <th className="text-left py-3 px-2">{t.location}</th>
                      <th className="text-left py-3 px-2">{t.rating}</th>
                      <th className="text-left py-3 px-2">{t.user}</th>
                      <th className="text-left py-3 px-2">{t.date}</th>
                      <th className="text-right py-3 px-2">{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.length > 0 ? (
                      reviews.map((review) => (
                        <tr key={review.id} className="border-b">
                          <td className="py-3 px-2">{review.hotelName}</td>
                          <td className="py-3 px-2">{review.location}</td>
                          <td className="py-3 px-2">{review.rating}</td>
                          <td className="py-3 px-2">{review.userName}</td>
                          <td className="py-3 px-2">{new Date(review.createdAt).toLocaleDateString()}</td>
                          <td className="py-3 px-2 text-right">
                            <Button variant="ghost" size="icon" onClick={() => confirmDelete(review.id, "review")}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-6 text-center text-muted-foreground">
                          {t.noReviewsFound}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>{t.allUsers}</CardTitle>
              <CardDescription>{t.manageAllUsers}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">{t.name}</th>
                      <th className="text-left py-3 px-2">{t.email}</th>
                      <th className="text-left py-3 px-2">{t.role}</th>
                      <th className="text-right py-3 px-2">{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user) => (
                        <tr key={user.id} className="border-b">
                          <td className="py-3 px-2">{user.name}</td>
                          <td className="py-3 px-2">{user.email}</td>
                          <td className="py-3 px-2">{user.role}</td>
                          <td className="py-3 px-2 text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => confirmDelete(user.id, "user")}
                              disabled={user.role === "admin"} // Prevent deleting admin users
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="py-6 text-center text-muted-foreground">
                          {t.noUsersFound}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.confirmDeletion}</AlertDialogTitle>
            <AlertDialogDescription>
              {itemToDelete?.type === "review" ? t.areYouSureDeleteReview : t.areYouSureDeleteUser}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              {t.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
