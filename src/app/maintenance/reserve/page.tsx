import { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import MaintenanceReserveForm from "@/components/MaintenanceReserveForm";

export const metadata: Metadata = {
  title: "メンテナンス予約",
  description:
    "cycleZ（サイクルゼット）のメンテナンス予約フォーム。点検・調整、チェーン洗浄、ブレーキ調整、タイヤ交換、オーバーホールなど、ご希望のメニューと日時をお選びください。",
};

export default function MaintenanceReservePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner
        title="メンテナンス予約"
        subtitle="MAINTENANCE RESERVATION"
        breadcrumbs={[
          { label: "メンテナンス", href: "/maintenance" },
          { label: "予約" },
        ]}
      />

      <MaintenanceReserveForm />
    </div>
  );
}
