-- イベント申込テーブルにペア申込関連カラムを追加
ALTER TABLE event_registrations
  ADD COLUMN IF NOT EXISTS registration_type text DEFAULT 'single',
  ADD COLUMN IF NOT EXISTS companion_name text,
  ADD COLUMN IF NOT EXISTS companion_phone text,
  ADD COLUMN IF NOT EXISTS companion_bike_type text,
  ADD COLUMN IF NOT EXISTS companion_bike_brake_type text,
  ADD COLUMN IF NOT EXISTS companion_bike_model text;
