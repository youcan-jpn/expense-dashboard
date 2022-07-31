# expense-dashboard
## 概要
支出管理のためのwebアプリ。
1人暮らしを始めたのでお金の管理をしっかりできるように家計簿的な使い方ができるアプリを作成することを目標にした。

## 開発環境の構築 (初回)
1. docker, docker-composeが使える環境を用意する
2. `docker volume create expenses_dashboard_db`を実行してvolumeを作成する
3. backend/flask/.envを作成し、.env.sampleの中身をコピペする（本番環境で使い回さないように注意）
4. `docker-compose up -d --build`でコンテナを立ち上げる

## TODO
- 消費税率が将来的に変わることも想定して税率のテーブル設計をちゃんとする(参考：[SQLで消費税の処理](https://sikushima.hatenablog.com/entry/2020/06/09/113306))
- 用途テーブルを作成し，各レシートに用途IDを持たせる

## NOTES
- ERDは一部正規化しきっていないところがある