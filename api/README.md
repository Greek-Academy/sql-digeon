# api

## 環境変数の設定

```sh
cp .env.example .env
```

## 環境を立ち上げる

```sh
make run-dev
```

## 環境を破棄する

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
