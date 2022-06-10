-- Postgresql

-- Project Name : expense-dashboard
-- Date/Time    : 2022/06/10 22:18:10
-- Author       : Yuta Ono
-- RDBMS Type   : PostgreSQL
-- Application  : A5:SQL Mk-2

/*
  << 注意！！ >>
  BackupToTempTable, RestoreFromTempTable疑似命令が付加されています。
  これにより、drop table, create table 後もデータが残ります。
  この機能は一時的に $$TableName のような一時テーブルを作成します。
  この機能は A5:SQL Mk-2でのみ有効であることに注意してください。
*/

-- 税率
--* RestoreFromTempTable
create table tax_list (
  tax_id serial not null
  , tax_rate integer not null
  , constraint tax_list_PKC primary key (tax_id)
) ;

-- レシート_リスト
--* RestoreFromTempTable
create table receipt_list (
  receipt_id integer not null
  , shop_id integer not null
  , purchase_date timestamp not null
  , discount integer
  , total_price_with_tax integer not null
  , modified_at timestamp default now() not null
  , created_at timestamp default now() not null
  , is_deleted boolean default FALSE not null
  , constraint receipt_list_PKC primary key (receipt_id)
) ;

-- レシート_詳細
--* RestoreFromTempTable
create table receipt_detail (
  receipt_id integer not null
  , product_id serial not null
  , product_name integer not null
  , price_wo_tax integer not null
  , tax_id integer not null
  , constraint receipt_detail_PKC primary key (receipt_id,product_id)
) ;

-- 店
--* RestoreFromTempTable
create table shop_list (
  shop_id serial not null
  , shop_name char(32) not null
  , modified_at timestamp default now() not null
  , created_at timestamp default now() not null
  , constraint shop_list_PKC primary key (shop_id)
) ;

alter table receipt_detail
  add constraint receipt_detail_FK1 foreign key (tax_id) references tax_list(tax_id);

alter table receipt_list
  add constraint receipt_list_FK1 foreign key (shop_id) references shop_list(shop_id);

alter table receipt_detail
  add constraint receipt_detail_FK2 foreign key (receipt_id) references receipt_list(receipt_id);

comment on table tax_list is '税率';
comment on column tax_list.tax_id is '消費税ID';
comment on column tax_list.tax_rate is '消費税率';

comment on table receipt_list is 'レシート_リスト';
comment on column receipt_list.receipt_id is 'レシートID';
comment on column receipt_list.shop_id is '店ID';
comment on column receipt_list.purchase_date is '購入日';
comment on column receipt_list.discount is '割引額';
comment on column receipt_list.total_price_with_tax is '税込合計金額';
comment on column receipt_list.modified_at is '更新日時';
comment on column receipt_list.created_at is '作成日時';
comment on column receipt_list.is_deleted is '削除済み';

comment on table receipt_detail is 'レシート_詳細';
comment on column receipt_detail.receipt_id is 'レシートID';
comment on column receipt_detail.product_id is '購入品ID';
comment on column receipt_detail.product_name is '商品名';
comment on column receipt_detail.price_wo_tax is '税抜き金額';
comment on column receipt_detail.tax_id is '消費税ID';

comment on table shop_list is '店';
comment on column shop_list.shop_id is '店ID';
comment on column shop_list.shop_name is '店名';
comment on column shop_list.modified_at is '更新日時';
comment on column shop_list.created_at is '作成日時';

