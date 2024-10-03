# api

## 環境変数の設定

```sh
cp .env.example .env
```

## DB環境を立ち上げる

```sh
make run-dev
```

## DB環境を破棄する

```sh
make destroy
```

## MySQLに接続する

```sh
docker exec -it api-mysql-1 mysql -udocker -ppassword
```

## migrateする

```sh
make migrate-up
```

## seedの投入

環境変数 `XML_PATH` にxmlファイルを置いた状態で下記のコマンドを実行する

```sh
make seed
```

## APIサーバの起動

```sh
npm run dev
```

## Bigquery認証情報

サービスアカウントキーが記載されたjsonファイルをapi/.authに配置する
参考： [サービス アカウント キーの作成と削除  |  IAM Documentation  |  Google Cloud](https://cloud.google.com/iam/docs/keys-create-delete?hl=ja#creating)
環境変数 `GOOGLE_APPLICATION_CREDENTIALS`にファイル名を記載
