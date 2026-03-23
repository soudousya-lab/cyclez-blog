"use client";

import { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// --- Leafletデフォルトアイコンの修正 ---
// webpack環境でアイコンパスが壊れる問題への対処
/* eslint-disable @typescript-eslint/no-explicit-any */
delete (L.Icon.Default.prototype as any)._getIconUrl;
/* eslint-enable @typescript-eslint/no-explicit-any */
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// --- ルートデータ型定義 ---
type Route = {
  id: string;
  name: string;
  nameEn: string;
  distance: string;
  elevation: string;
  difficulty: number; // 1〜5
  color: string;
  description: string;
  coordinates: [number, number][];
};

// --- サンプルルートデータ（ポリライン座標） ---
const routes: Route[] = [
  {
    id: "kibi",
    name: "吉備路コース",
    nameEn: "Kibi-ji Course",
    distance: "約20km",
    elevation: "50m",
    difficulty: 1,
    color: "#22c55e", // 緑（初心者）
    description:
      "cycleZを出発し、吉備津神社・国分寺を巡るフラットなコース。歴史スポットが多く、写真映えも抜群。初めてのロードバイクライドにおすすめです。",
    coordinates: [
      [34.663, 133.914], // cycleZ（スタート）
      [34.665, 133.905],
      [34.667, 133.895],
      [34.669, 133.885],
      [34.670, 133.875],
      [34.670, 133.865],
      [34.669, 133.855],
      [34.668, 133.840], // 吉備津神社
      [34.665, 133.830],
      [34.660, 133.820],
      [34.652, 133.815], // 国分寺
      [34.648, 133.825],
      [34.650, 133.840],
      [34.652, 133.860],
      [34.655, 133.880],
      [34.658, 133.895],
      [34.660, 133.905],
      [34.663, 133.914], // cycleZ（ゴール）
    ],
  },
  {
    id: "asahi",
    name: "旭川サイクリングロード",
    nameEn: "Asahi River Cycling Road",
    distance: "約30km",
    elevation: "30m",
    difficulty: 2,
    color: "#3b82f6", // 青（初中級）
    description:
      "旭川沿いの整備されたサイクリングロードを走るコース。信号が少なく、川沿いの景色を楽しみながら快適に走れます。百間川エリアまで足を延ばせます。",
    coordinates: [
      [34.663, 133.914], // cycleZ
      [34.668, 133.917],
      [34.673, 133.919],
      [34.680, 133.920], // 旭川河川敷
      [34.685, 133.922],
      [34.690, 133.928],
      [34.695, 133.935],
      [34.700, 133.950], // 百間川
      [34.698, 133.955],
      [34.693, 133.952],
      [34.688, 133.945],
      [34.683, 133.938],
      [34.678, 133.932],
      [34.673, 133.925],
      [34.668, 133.920],
      [34.663, 133.914], // cycleZ（ゴール）
    ],
  },
  {
    id: "hiruzen",
    name: "蒜山高原コース",
    nameEn: "Hiruzen Highland Course",
    distance: "約60km",
    elevation: "800m",
    color: "#f59e0b", // オレンジ（中上級）
    difficulty: 4,
    description:
      "蒜山高原を周回する本格的なヒルクライムコース。獲得標高800mのアップダウンを越えた先には、雄大な大山の景色が待っています。脚力に自信のある方向け。",
    coordinates: [
      [35.280, 133.620],
      [35.290, 133.630],
      [35.300, 133.650], // 蒜山エリア中心
      [35.310, 133.670],
      [35.315, 133.690],
      [35.312, 133.710],
      [35.305, 133.720],
      [35.295, 133.715],
      [35.285, 133.700],
      [35.278, 133.680],
      [35.275, 133.660],
      [35.276, 133.640],
      [35.280, 133.620], // ループ完了
    ],
  },
  {
    id: "shimanami",
    name: "しまなみ海道",
    nameEn: "Shimanami Kaido",
    distance: "約70km",
    elevation: "500m",
    color: "#ef4444", // 赤（上級）
    difficulty: 5,
    description:
      "サイクリストの聖地・しまなみ海道。尾道から今治まで6つの島を橋で渡る絶景ルート。岡山からJRで尾道まで約1.5時間。一生に一度は走りたいコースです。",
    coordinates: [
      [34.409, 133.205], // 尾道
      [34.390, 133.180],
      [34.370, 133.150],
      [34.350, 133.130], // 因島
      [34.320, 133.110],
      [34.290, 133.090], // 生口島
      [34.260, 133.070],
      [34.230, 133.060], // 大三島
      [34.200, 133.050],
      [34.170, 133.030], // 伯方島
      [34.140, 133.020],
      [34.110, 133.005], // 大島
      [34.080, 132.998],
      [34.066, 132.998], // 今治
    ],
  },
];

// --- 難易度の星表示 ---
function DifficultyStars({ level }: { level: number }) {
  return (
    <span className="text-yellow-500 tracking-wider" aria-label={`難易度${level}`}>
      {Array.from({ length: 5 }, (_, i) =>
        i < level ? "★" : "☆"
      ).join("")}
    </span>
  );
}

// --- マップ制御用コンポーネント ---
function MapController({
  selectedRoute,
}: {
  selectedRoute: Route | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedRoute) {
      // 選択ルートにフィット
      const bounds = L.latLngBounds(
        selectedRoute.coordinates.map(([lat, lng]) => [lat, lng])
      );
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
    } else {
      // 全体表示（岡山中心）
      map.setView([34.66, 133.92], 10);
    }
  }, [selectedRoute, map]);

  return null;
}

// --- バウンスマーカー用アイコン ---
function createColoredIcon(color: string) {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: 16px;
      height: 16px;
      background: ${color};
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(0,0,0,0.4);
      animation: bounce 0.6s ease infinite alternate;
    "></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

// --- メインコンポーネント ---
export default function RouteMap() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // SSR回避（Leafletはwindowが必要）
  useEffect(() => {
    setMounted(true);
  }, []);

  const selectedRoute = routes.find((r) => r.id === selectedId) ?? null;

  // ルートカードクリック時の処理
  const handleSelect = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  if (!mounted) {
    // SSR/初回レンダリング時はプレースホルダー表示
    return (
      <div className="space-y-6">
        <div className="w-full h-[60vh] min-h-[400px] bg-gray-200 rounded-2xl flex items-center justify-center">
          <p className="text-gray-500">マップを読み込み中...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {routes.map((route) => (
            <div
              key={route.id}
              className="bg-white rounded-xl p-5 shadow-sm animate-pulse"
            >
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* バウンスアニメーション用CSS */}
      <style jsx global>{`
        @keyframes bounce {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-8px);
          }
        }
      `}</style>

      {/* インタラクティブマップ */}
      <div className="w-full h-[60vh] min-h-[400px] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
        <MapContainer
          center={[34.66, 133.92]}
          zoom={10}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapController selectedRoute={selectedRoute} />

          {/* 全ルートのポリライン */}
          {routes.map((route) => {
            const isSelected = route.id === selectedId;
            const isOther = selectedId !== null && !isSelected;

            return (
              <Polyline
                key={route.id}
                positions={route.coordinates}
                pathOptions={{
                  color: route.color,
                  weight: isSelected ? 6 : 3,
                  opacity: isOther ? 0.25 : 0.85,
                  dashArray: isOther ? "8 6" : undefined,
                }}
                eventHandlers={{
                  click: () => handleSelect(route.id),
                }}
              />
            );
          })}

          {/* 選択ルートのスタート・ゴールマーカー */}
          {selectedRoute && (
            <>
              <Marker
                position={selectedRoute.coordinates[0]}
                icon={createColoredIcon(selectedRoute.color)}
              >
                <Popup>
                  <strong>{selectedRoute.name}</strong>
                  <br />
                  スタート地点
                </Popup>
              </Marker>
              <Marker
                position={
                  selectedRoute.coordinates[
                    selectedRoute.coordinates.length - 1
                  ]
                }
                icon={createColoredIcon(selectedRoute.color)}
              >
                <Popup>
                  <strong>{selectedRoute.name}</strong>
                  <br />
                  ゴール地点
                </Popup>
              </Marker>
            </>
          )}
        </MapContainer>
      </div>

      {/* ルートカード一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {routes.map((route) => {
          const isSelected = route.id === selectedId;

          return (
            <button
              key={route.id}
              ref={(el) => {
                cardRefs.current[route.id] = el;
              }}
              onClick={() => handleSelect(route.id)}
              className={`text-left bg-white rounded-xl p-5 shadow-sm border-2 transition-all duration-200 hover:shadow-md cursor-pointer ${
                isSelected
                  ? "border-[#c41e3a] ring-2 ring-[#c41e3a]/20"
                  : "border-transparent hover:border-gray-200"
              }`}
            >
              {/* ルート名 + カラーバー */}
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="w-1 h-8 rounded-full flex-shrink-0"
                  style={{ backgroundColor: route.color }}
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {route.name}
                  </h3>
                  <p className="text-xs text-gray-400">{route.nameEn}</p>
                </div>
              </div>

              {/* 距離・標高・難易度 */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mb-3">
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  {route.distance}
                </span>
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                  獲得標高 {route.elevation}
                </span>
                <DifficultyStars level={route.difficulty} />
              </div>

              {/* 説明文 */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {route.description}
              </p>

              {/* 選択中の表示 */}
              {isSelected && (
                <p className="mt-3 text-xs text-[#c41e3a] font-bold">
                  マップに表示中 ▲
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
