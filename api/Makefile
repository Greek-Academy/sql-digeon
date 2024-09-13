# Docker composeコマンド共通部分
DOCKER_COMPOSE_DEV = docker compose -f docker-compose.dev.yml

# 開発用コンテナを起動
.PHONY: run-dev
run-dev:
	$(DOCKER_COMPOSE_DEV) up -d

# 開発用コンテナを削除
.PHONY: destroy
destroy:
	$(DOCKER_COMPOSE_DEV) down --volumes --remove-orphans
	rm -rf mysql/mysql-data || rd /s /q mysql\mysql-data
