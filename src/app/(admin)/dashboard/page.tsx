import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, ShoppingBag, Activity } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif text-wood-900">Dashboard</h1>
        <p className="text-wood-600">Welcome back. Here is what's happening at the bistro today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white border-wood-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-wood-600">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-gold-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-wood-900">$1,234.50</div>
            <p className="text-xs text-wood-500">+20.1% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-wood-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-wood-600">Active Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-gold-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-wood-900">+12</div>
            <p className="text-xs text-wood-500">4 preparing, 8 served</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-wood-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-wood-600">Reservations</CardTitle>
            <Users className="h-4 w-4 text-gold-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-wood-900">8</div>
            <p className="text-xs text-wood-500">For tonight's service</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-wood-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-wood-600">System Status</CardTitle>
            <Activity className="h-4 w-4 text-gold-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-wood-900">Online</div>
            <p className="text-xs text-wood-500">All systems operational</p>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder for Recent Activity Table */}
      <div className="rounded-md border border-wood-200 bg-white p-6">
        <h3 className="font-serif text-xl mb-4 text-wood-900">Recent Activity</h3>
        <div className="h-48 flex items-center justify-center text-wood-400 border-2 border-dashed border-wood-100 rounded">
          Chart or Recent Orders Table will go here
        </div>
      </div>
    </div>
  );
}