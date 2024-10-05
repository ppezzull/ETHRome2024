import { Card } from "../ui/card";
import Sidebar from "@/components/home/sidebar";

export default function Dashboard() {
  const demo: any[] = [
    { title: "Title", subtitle: "Subtitle", description: "Description", amount: "Amount" },
    { title: "Title", subtitle: "Subtitle", description: "Description", amount: "Amount" },
  ];

  return (
    <div className="flex flex-col h-svh py-6 pr-6">
      <Card className="p-4 h-svh">
        <span className="text-3xl font-bold">Dashboard</span>
        <div className="h-full flex w-full mt-8 flex-col">
          {demo.map((item, index) => (
            <div key={index} className="flex flex-col w-full">
              <div className="flex justify-around">
                <span className="text-lg">Description</span>
                <span className="text-lg">Amount</span>
                <span className="text-lg">Description</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
