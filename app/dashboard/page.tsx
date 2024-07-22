import Link from 'next/link';
import Iconify from '@component/Iconify'

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-screen w-full ">
      {/* --------------------  Sidebar -------------------- */}
      <aside className="w-64 h-full bg-blue-800 text-white fixed top-0 left-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-8">Generic Bank Dashboard</h1>
          <ul>
            <li className="mb-4">
              <span className="hover:text-yellow-400">Account Overview</span>
            </li>
            <li className="mb-4">
              <span className="hover:text-yellow-400">Recent Transactions</span>
            </li>
            <li className="mb-4">
              <span className="hover:text-yellow-400">Financial Analytics</span>
            </li>
            <li>
            <Link href="/dashboard/transactions" className="hover:text-yellow-400 flex">
              <Iconify type='businessman' />
              Transactions
            </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* -------------------- Main Content -------------------- */}
      <main className="ml-64 p-8 w-full flex-1 text-black">
        {/* Account Overview */}
        <section id="overview" className="mb-12 bg-white p-6 rounded-lg shadow-lg max-w-[1200px]">
          <h2 className="text-3xl font-bold mb-6">Account Overview</h2>
          <div className="flex justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold">Account Balance</h3>
              <p className="text-2xl text-green-600">€12,345.67</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Available Balance</h3>
              <p className="text-xl">€10,000.00</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Pending Transactions</h3>
              <p className="text-xl">€345.67</p>
            </div>
          </div>
        </section>

        {/* -------------------- Recent Transactions -------------------- */}
        <section id="transactions" className="mb-12 bg-white p-6 rounded-lg shadow-lg max-w-[1200px]">
          <h2 className="text-3xl font-bold mb-6">Recent Transactions</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4">Date</th>
                <th className="text-left py-2 px-4">Description</th>
                <th className="text-left py-2 px-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-4">2024-07-20</td>
                <td className="py-2 px-4">ATM Withdrawal</td>
                <td className="py-2 px-4 text-red-600">- $100.00</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4">2024-07-19</td>
                <td className="py-2 px-4">Direct Deposit</td>
                <td className="py-2 px-4 text-green-600">+ $1,200.00</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4">2024-07-18</td>
                <td className="py-2 px-4">Online Purchase</td>
                <td className="py-2 px-4 text-red-600">- $250.00</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* -------------------- Financial Analytics -------------------- */}
        <section id="analytics" className="mb-12 bg-white p-6 rounded-lg shadow-lg max-w-[1200px]">
          <h2 className="text-3xl font-bold mb-6">Financial Analytics</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-lg">This is where your financial insights will go. Graphs and charts can be added here.</p>
          </div>
        </section>


      </main>
    </div>
  );
}
