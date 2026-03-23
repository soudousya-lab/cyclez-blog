"use client";

import { useState } from "react";

// メンテナンスメニューの型定義
type MenuItem = {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
};

// お客様情報の型定義
type CustomerInfo = {
  name: string;
  phone: string;
  email: string;
  bikeModel: string;
  notes: string;
};

// メニュー一覧
const MENU_ITEMS: MenuItem[] = [
  {
    id: "inspection",
    title: "点検・調整（無料）",
    description: "空気圧チェック、ボルト増し締め、変速調整",
    duration: "15分〜",
    price: "¥0",
  },
  {
    id: "chain",
    title: "チェーン洗浄・注油",
    description: "チェーン洗浄、注油、駆動系クリーニング",
    duration: "30分〜",
    price: "¥2,200〜",
  },
  {
    id: "brake",
    title: "ブレーキ調整",
    description: "ブレーキパッド確認、ワイヤー調整",
    duration: "30分〜",
    price: "¥1,650〜",
  },
  {
    id: "tire",
    title: "タイヤ・チューブ交換",
    description: "パンク修理、タイヤ交換",
    duration: "30分〜",
    price: "¥1,100〜（部品代別）",
  },
  {
    id: "overhaul",
    title: "オーバーホール",
    description: "フル分解・洗浄・グリスアップ・再組立",
    duration: "1週間〜",
    price: "¥22,000〜",
  },
  {
    id: "other",
    title: "その他・相談",
    description: "上記以外のメンテナンス",
    duration: "要相談",
    price: "要見積もり",
  },
];

// 予約可能な時間帯
const TIME_SLOTS = ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

// ステップ名
const STEP_LABELS = ["メニュー選択", "希望日時", "お客様情報", "確認"];

/**
 * 明日の日付をYYYY-MM-DD形式で返す
 */
function getTomorrowDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}

/**
 * 指定日が水曜日（定休日）かどうかを判定
 */
function isWednesday(dateStr: string): boolean {
  const date = new Date(dateStr);
  return date.getDay() === 3;
}

/**
 * 日付を表示用にフォーマット（YYYY年MM月DD日（曜日））
 */
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const day = days[date.getDay()];
  return `${y}年${m}月${d}日（${day}）`;
}

/**
 * ステップインジケーター
 */
function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8 md:mb-12">
      {STEP_LABELS.map((label, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;

        return (
          <div key={stepNum} className="flex items-center">
            {/* ステップ番号と名称 */}
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center
                  text-sm md:text-base font-bold transition-colors
                  ${isActive ? "bg-[#c41e3a] text-white" : ""}
                  ${isCompleted ? "bg-[#c41e3a] text-white" : ""}
                  ${!isActive && !isCompleted ? "bg-gray-200 text-gray-500" : ""}
                `}
              >
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              <span
                className={`
                  text-[10px] md:text-xs mt-1 whitespace-nowrap
                  ${isActive ? "text-[#c41e3a] font-bold" : ""}
                  ${isCompleted ? "text-[#c41e3a]" : ""}
                  ${!isActive && !isCompleted ? "text-gray-400" : ""}
                `}
              >
                {label}
              </span>
            </div>
            {/* ステップ間のコネクター */}
            {index < STEP_LABELS.length - 1 && (
              <div
                className={`
                  w-8 md:w-16 h-0.5 mx-1 md:mx-2 mt-[-16px] md:mt-[-14px]
                  ${stepNum < currentStep ? "bg-[#c41e3a]" : "bg-gray-200"}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function MaintenanceReserveForm() {
  // フォームの状態管理
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [dateError, setDateError] = useState("");
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    phone: "",
    email: "",
    bikeModel: "",
    notes: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 選択中のメニュー情報を取得
  const selectedMenuItem = MENU_ITEMS.find((item) => item.id === selectedMenu);

  // 日付変更ハンドラー
  const handleDateChange = (value: string) => {
    setSelectedDate(value);
    if (isWednesday(value)) {
      setDateError("水曜日は定休日のため選択できません。別の日をお選びください。");
    } else {
      setDateError("");
    }
  };

  // お客様情報変更ハンドラー
  const handleCustomerChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }));
  };

  // 次のステップへ進めるか判定
  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1:
        return selectedMenu !== null;
      case 2:
        return selectedDate !== "" && !isWednesday(selectedDate) && selectedTime !== null;
      case 3:
        return customerInfo.name.trim() !== "" && customerInfo.phone.trim() !== "";
      default:
        return false;
    }
  };

  // 送信ハンドラー（フロントエンドのみ）
  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  // 送信完了画面
  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 text-center">
          {/* 成功アイコン */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            予約リクエストを送信しました
          </h2>
          <p className="text-gray-600 leading-relaxed mb-2">
            ご予約ありがとうございます。
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            店舗からの折り返し連絡をもって予約確定とさせていただきます。
          </p>

          {/* 予約内容サマリー */}
          <div className="bg-gray-50 rounded-xl p-6 text-left mb-8">
            <h3 className="font-bold text-gray-900 mb-3 text-sm">予約内容</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex">
                <dt className="text-gray-500 w-28 flex-shrink-0">メニュー</dt>
                <dd className="text-gray-900 font-medium">{selectedMenuItem?.title}</dd>
              </div>
              <div className="flex">
                <dt className="text-gray-500 w-28 flex-shrink-0">日時</dt>
                <dd className="text-gray-900 font-medium">
                  {formatDate(selectedDate)} {selectedTime}
                </dd>
              </div>
              <div className="flex">
                <dt className="text-gray-500 w-28 flex-shrink-0">お名前</dt>
                <dd className="text-gray-900 font-medium">{customerInfo.name}</dd>
              </div>
              <div className="flex">
                <dt className="text-gray-500 w-28 flex-shrink-0">電話番号</dt>
                <dd className="text-gray-900 font-medium">{customerInfo.phone}</dd>
              </div>
            </dl>
          </div>

          <a
            href="/"
            className="inline-block bg-[#c41e3a] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#a31830] transition-colors"
          >
            トップページに戻る
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* ステップインジケーター */}
      <StepIndicator currentStep={currentStep} />

      {/* ステップ1: メニュー選択 */}
      {currentStep === 1 && (
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 text-center">
            メンテナンスメニューを選択
          </h2>
          <p className="text-gray-500 text-sm text-center mb-8">
            ご希望のメニューをお選びください
          </p>

          <div className="grid gap-4">
            {MENU_ITEMS.map((item) => {
              const isSelected = selectedMenu === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedMenu(item.id)}
                  className={`
                    w-full text-left p-5 md:p-6 rounded-xl border-2 transition-all
                    ${isSelected
                      ? "border-[#c41e3a] bg-[#c41e3a]/5 shadow-md"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                    }
                  `}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className={`font-bold text-base md:text-lg mb-1 ${isSelected ? "text-[#c41e3a]" : "text-gray-900"}`}>
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                      <p className="text-gray-400 text-xs mt-2">所要時間: {item.duration}</p>
                    </div>
                    <div className="flex flex-col items-end flex-shrink-0">
                      <span className={`text-lg md:text-xl font-bold ${isSelected ? "text-[#c41e3a]" : "text-gray-900"}`}>
                        {item.price}
                      </span>
                      {/* 選択状態のチェックマーク */}
                      <div
                        className={`
                          w-6 h-6 rounded-full border-2 flex items-center justify-center mt-2 transition-colors
                          ${isSelected ? "border-[#c41e3a] bg-[#c41e3a]" : "border-gray-300"}
                        `}
                      >
                        {isSelected && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ステップ2: 希望日時 */}
      {currentStep === 2 && (
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 text-center">
            希望日時を選択
          </h2>
          <p className="text-gray-500 text-sm text-center mb-8">
            ご希望の日付と時間帯をお選びください
          </p>

          <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-6">
            {/* 日付選択 */}
            <label className="block mb-6">
              <span className="text-sm font-bold text-gray-700 mb-2 block">
                希望日
                <span className="text-[#c41e3a] ml-1">*</span>
              </span>
              <input
                type="date"
                min={getTomorrowDate()}
                value={selectedDate}
                onChange={(e) => handleDateChange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#c41e3a]/30 focus:border-[#c41e3a]"
              />
              {dateError && (
                <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {dateError}
                </p>
              )}
              <p className="text-gray-400 text-xs mt-2">※ 水曜日は定休日です</p>
            </label>

            {/* 時間帯選択 */}
            <div>
              <span className="text-sm font-bold text-gray-700 mb-3 block">
                希望時間
                <span className="text-[#c41e3a] ml-1">*</span>
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {TIME_SLOTS.map((time) => {
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`
                        py-3 px-2 rounded-lg border-2 text-sm font-medium transition-all
                        ${isSelected
                          ? "border-[#c41e3a] bg-[#c41e3a] text-white"
                          : "border-gray-200 text-gray-700 hover:border-gray-300"
                        }
                      `}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 注意事項 */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
            <p className="font-medium mb-1">ご注意</p>
            <ul className="list-disc list-inside space-y-1 text-amber-700">
              <li>予約確定は店舗からの折り返し連絡をもってとさせていただきます</li>
              <li>混雑状況によりご希望の日時に添えない場合がございます</li>
              <li>オーバーホールはお預かりとなります</li>
            </ul>
          </div>
        </div>
      )}

      {/* ステップ3: お客様情報 */}
      {currentStep === 3 && (
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 text-center">
            お客様情報の入力
          </h2>
          <p className="text-gray-500 text-sm text-center mb-8">
            ご連絡先をご入力ください
          </p>

          <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 space-y-6">
            {/* お名前 */}
            <label className="block">
              <span className="text-sm font-bold text-gray-700 mb-2 block">
                お名前
                <span className="text-[#c41e3a] ml-1">*</span>
              </span>
              <input
                type="text"
                value={customerInfo.name}
                onChange={(e) => handleCustomerChange("name", e.target.value)}
                placeholder="山田 太郎"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c41e3a]/30 focus:border-[#c41e3a]"
                required
              />
            </label>

            {/* 電話番号 */}
            <label className="block">
              <span className="text-sm font-bold text-gray-700 mb-2 block">
                電話番号
                <span className="text-[#c41e3a] ml-1">*</span>
              </span>
              <input
                type="tel"
                value={customerInfo.phone}
                onChange={(e) => handleCustomerChange("phone", e.target.value)}
                placeholder="090-1234-5678"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c41e3a]/30 focus:border-[#c41e3a]"
                required
              />
            </label>

            {/* メールアドレス */}
            <label className="block">
              <span className="text-sm font-bold text-gray-700 mb-2 block">
                メールアドレス
                <span className="text-gray-400 text-xs ml-1">（任意）</span>
              </span>
              <input
                type="email"
                value={customerInfo.email}
                onChange={(e) => handleCustomerChange("email", e.target.value)}
                placeholder="example@email.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c41e3a]/30 focus:border-[#c41e3a]"
              />
            </label>

            {/* 自転車のメーカー・車種 */}
            <label className="block">
              <span className="text-sm font-bold text-gray-700 mb-2 block">
                自転車のメーカー・車種
                <span className="text-gray-400 text-xs ml-1">（任意）</span>
              </span>
              <input
                type="text"
                value={customerInfo.bikeModel}
                onChange={(e) => handleCustomerChange("bikeModel", e.target.value)}
                placeholder="例: SCOTT Addict RC 30"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c41e3a]/30 focus:border-[#c41e3a]"
              />
            </label>

            {/* ご要望・症状 */}
            <label className="block">
              <span className="text-sm font-bold text-gray-700 mb-2 block">
                ご要望・症状
                <span className="text-gray-400 text-xs ml-1">（任意）</span>
              </span>
              <textarea
                value={customerInfo.notes}
                onChange={(e) => handleCustomerChange("notes", e.target.value)}
                placeholder="例: 変速がうまく入らない、異音がする など"
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c41e3a]/30 focus:border-[#c41e3a] resize-none"
              />
            </label>
          </div>
        </div>
      )}

      {/* ステップ4: 確認 */}
      {currentStep === 4 && (
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 text-center">
            予約内容の確認
          </h2>
          <p className="text-gray-500 text-sm text-center mb-8">
            以下の内容でよろしければ送信してください
          </p>

          <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
            <dl className="divide-y divide-gray-100">
              {/* メニュー */}
              <div className="py-4 first:pt-0">
                <dt className="text-sm text-gray-500 mb-1">メンテナンスメニュー</dt>
                <dd className="text-gray-900 font-medium">{selectedMenuItem?.title}</dd>
                <dd className="text-gray-500 text-sm">{selectedMenuItem?.description}</dd>
                <dd className="text-[#c41e3a] font-bold mt-1">
                  {selectedMenuItem?.price}（所要時間: {selectedMenuItem?.duration}）
                </dd>
              </div>

              {/* 日時 */}
              <div className="py-4">
                <dt className="text-sm text-gray-500 mb-1">希望日時</dt>
                <dd className="text-gray-900 font-medium">
                  {formatDate(selectedDate)} {selectedTime}
                </dd>
              </div>

              {/* お名前 */}
              <div className="py-4">
                <dt className="text-sm text-gray-500 mb-1">お名前</dt>
                <dd className="text-gray-900 font-medium">{customerInfo.name}</dd>
              </div>

              {/* 電話番号 */}
              <div className="py-4">
                <dt className="text-sm text-gray-500 mb-1">電話番号</dt>
                <dd className="text-gray-900 font-medium">{customerInfo.phone}</dd>
              </div>

              {/* メールアドレス（入力時のみ表示） */}
              {customerInfo.email && (
                <div className="py-4">
                  <dt className="text-sm text-gray-500 mb-1">メールアドレス</dt>
                  <dd className="text-gray-900 font-medium">{customerInfo.email}</dd>
                </div>
              )}

              {/* 自転車のメーカー・車種（入力時のみ表示） */}
              {customerInfo.bikeModel && (
                <div className="py-4">
                  <dt className="text-sm text-gray-500 mb-1">自転車のメーカー・車種</dt>
                  <dd className="text-gray-900 font-medium">{customerInfo.bikeModel}</dd>
                </div>
              )}

              {/* ご要望・症状（入力時のみ表示） */}
              {customerInfo.notes && (
                <div className="py-4">
                  <dt className="text-sm text-gray-500 mb-1">ご要望・症状</dt>
                  <dd className="text-gray-900 whitespace-pre-wrap">{customerInfo.notes}</dd>
                </div>
              )}
            </dl>
          </div>

          {/* 注意書き */}
          <p className="text-gray-500 text-sm text-center mt-6">
            ※ 予約確定は店舗からの折り返し連絡をもってとさせていただきます
          </p>
        </div>
      )}

      {/* ナビゲーションボタン */}
      <div className="flex items-center justify-between mt-8 gap-4">
        {/* 戻るボタン */}
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={() => setCurrentStep((prev) => prev - 1)}
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            戻る
          </button>
        ) : (
          <div />
        )}

        {/* 次へ / 送信ボタン */}
        {currentStep < 4 ? (
          <button
            type="button"
            onClick={() => setCurrentStep((prev) => prev + 1)}
            disabled={!canProceed()}
            className={`
              flex items-center gap-2 px-8 py-3 rounded-lg font-medium transition-colors
              ${canProceed()
                ? "bg-[#c41e3a] text-white hover:bg-[#a31830]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            次へ
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center gap-2 px-8 py-3 rounded-lg bg-[#c41e3a] text-white font-medium hover:bg-[#a31830] transition-colors"
          >
            予約リクエストを送信
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
