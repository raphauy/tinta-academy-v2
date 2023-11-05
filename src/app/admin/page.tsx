import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import Link from "next/link";
import { getUsersDAO } from "./users/_services/actions";

export default async function AdminPage() {

  const users= await getUsersDAO()

  return (
    <div className="flex flex-col">
      <p className="mt-10 mb-5 text-3xl font-bold text-center">Admin Dashboard</p>
      <div className="grid max-w-xl grid-cols-1 gap-10 sm:grid-cols-1">
        <div className="flex flex-col items-center">
          <Link href="/admin/users">
            <Card className="w-64 text-muted-foreground">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm">Usuarios</CardTitle>
                <User className="text-gray-500" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.length}</div>
                <div className="flex justify-between">
                    <p className="text-xs text-muted-foreground">
                      admin ({users.filter(user => user.role === "admin").length})
                    </p>
                    <p className="text-xs text-muted-foreground">
                      user ({users.filter(user => user.role === "user").length})
                    </p>
                </div>
                <div className="flex justify-between">
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
