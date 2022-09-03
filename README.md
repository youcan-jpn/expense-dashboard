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

## DIARY

### 2022/09/03
- nodeのコンテナを用意してreactを動かしたところ同じCORSエラーが出た
- flask側のエラーメッセージを確認したところ、{"shop_name": "sample_name"}のようにわたさなければいけないところを{"shop_name": {"shop_name": "sample_name"}}を渡してしまっていることに気が付いた
  - typescriptを書くときにミスしていた
  - postmanでは正しく送信できていたので、まずTS側の間違えを疑うべきだった
### 2022/09/02
- POST /receipts, DELETE /receipts/{receipt_id}を実装してフロントエンドの実装に移った
- ルーティングの設定を簡単にして、navBarを作成した
- shopの一覧を表示するページを作成した
- POST /shopsを利用するフォームを作成したがCORSによりうまく動かない
- axiosでapiを叩くときにCORSでエラーが出る
  - flask-corsを導入することでGET時のエラーはなくなった
  - POST時はいまだにエラーが出る
    - "No 'Access-Control-Allow-Origin' header is present on the requested resource."
    - [このページ](https://melheaven.hatenadiary.jp/entry/react-flask-cors)の方法がPOSTにも対応していると色々なページに書いてあったが手元の環境ではうまくいかなかった
    - [このページ](https://stackoverflow.com/questions/39550920/flask-cors-not-working-for-post-but-working-for-get)もだめ
    - 最悪docker-composeでreactを動かしてnetworkを使えば回避できそう
    - Nginxのコンテナを用意してbuildした後のファイルを置く形でもいいが動かしながら開発するのがめんどくさそう