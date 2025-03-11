# Makefile
.PHONY: dev build down clean

dev:
	docker compose up --build

build:
	docker compose build

down:
	docker compose down

clean:
	docker compose down -v
	docker system prune -f