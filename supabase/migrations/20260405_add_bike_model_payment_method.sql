-- イベント申込テーブルに自転車車種名・支払い方法カラムを追加
ALTER TABLE event_registrations
  ADD COLUMN IF NOT EXISTS bike_model text,
  ADD COLUMN IF NOT EXISTS payment_method text DEFAULT 'store_payment';

-- bike_brake_type を nullable に変更（既存データとの互換性）
ALTER TABLE event_registrations
  ALTER COLUMN bike_brake_type DROP NOT NULL;
