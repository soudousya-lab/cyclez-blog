-- イベント申込テーブルの初期スキーマ（Supabaseプロジェクト再作成用）
--
-- 経緯: 2026-08-24 時点で本番の Supabase プロジェクト qqimatdwnfxfowyunmin が
-- DNS NXDOMAIN（＝プロジェクトが存在しない）となり、blog の申込フォームと
-- CRM /admin/events が両方とも死んでいた。既存の migrations は ALTER のみで
-- CREATE TABLE が無く（初回はSupabaseのSQLエディタで手作業で作られた）、
-- プロジェクトを作り直す場合に復元できなかったため、コードから逆算して起こした。
--
-- 実行順: このファイル → 20260405_add_bike_model_payment_method.sql
--         → 20260427_add_pair_registration.sql
-- （このファイルは追加カラムまで込みで作るので、既存の2本は IF NOT EXISTS で空振りする）

create extension if not exists "pgcrypto";

create table if not exists event_registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- どのイベント記事の申込か（content/posts/<slug>.md の slug）
  event_slug text not null,

  -- 申込者
  name text not null,
  phone text not null,
  bike_type text not null,              -- 'crossbike' | 'roadbike'
  bike_brake_type text,                 -- 'rim' | 'disc'（初期データ互換のため nullable）
  bike_model text,

  -- 支払い
  payment_method text default 'store_payment',  -- 'store_payment' | 'bank_transfer'
  amount integer,
  payment_status text not null default 'pending', -- 'pending' | 'paid' | 'cancelled' | 'failed'
  stripe_checkout_session_id text,

  -- ペア申込（2席消費）
  registration_type text default 'single',      -- 'single' | 'pair'
  companion_name text,
  companion_phone text,
  companion_bike_type text,
  companion_bike_brake_type text,
  companion_bike_model text
);

-- 残席計算（event_slug + payment_status での絞り込み）が全アクセスの主経路
create index if not exists event_registrations_event_slug_idx
  on event_registrations (event_slug);
create index if not exists event_registrations_event_slug_status_idx
  on event_registrations (event_slug, payment_status);
create index if not exists event_registrations_stripe_session_idx
  on event_registrations (stripe_checkout_session_id);

-- ⚠️ RLSは必ず有効にする。
-- anon key (NEXT_PUBLIC_SUPABASE_ANON_KEY) はブラウザのバンドルに載っており、
-- RLSを切ると「申込者の氏名・電話番号が誰でも読める」状態になる。
-- 読み書きは全て service_role（サーバー側 API のみ）で行う設計なので、
-- anon / authenticated 向けのポリシーは1つも作らない（= 全拒否）。
alter table event_registrations enable row level security;

comment on table event_registrations is
  'ブログのイベント申込フォーム(/api/events/register)の保存先。読み書きはservice_roleのみ。CRM /admin/events が同じ行を参照する。';
