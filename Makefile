SHELL := /bin/bash

# Python 3.10 or later
PYTHON := python3
VENV := .venv
BIN := $(VENV)/bin

# Preferred port for `serve`; if it is busy, the next free one is used.
# Override with e.g. `make serve PORT=9000`
PORT ?= 8000
# First free TCP port starting at $(PORT)
FREE_PORT = p=$(PORT); until $(PYTHON) -c "import socket,sys; socket.socket().bind(('0.0.0.0',int(sys.argv[1])))" $$p 2>/dev/null; do p=$$((p+1)); done; echo $$p

################################################################################
# COMMANDS                                                                     #
################################################################################

$(BIN)/zensical: pyproject.toml
	$(PYTHON) -m venv $(VENV)
	$(BIN)/pip install -q -e .
	@touch $@

.PHONY: install
## Create the virtual environment and install the dependencies
install: $(BIN)/zensical

.PHONY: serve
## Serve the site at http://localhost:8000 (or the next free port), reloading on every change
serve: install
	@port=$$($(FREE_PORT)); \
	[ "$$port" = "$(PORT)" ] || echo "Port $(PORT) is busy, using $$port instead"; \
	$(BIN)/zensical serve -a localhost:$$port

.PHONY: serve-lan
## Serve the site to your local network or tailnet (port 8000 or the next free one); stop it with Ctrl+C
serve-lan: install
	@port=$$($(FREE_PORT)); \
	[ "$$port" = "$(PORT)" ] || echo "Port $(PORT) is busy, using $$port instead"; \
	$(BIN)/zensical serve -a 0.0.0.0:$$port

.PHONY: build
## Build the site into public/ in strict mode, as CI does: any broken link or warning fails
build: install
	$(BIN)/zensical build --clean --strict

.PHONY: clean
## Remove the built site, the build cache and the virtual environment
clean:
	rm -rf public .cache $(VENV)

################################################################################
# Self Documenting Commands                                                    #
################################################################################

.DEFAULT_GOAL := help

# Inspired by <http://marmelab.com/blog/2016/02/29/auto-documented-makefile.html>
# sed script explained:
# /^##/:
# 	* save line in hold space
# 	* purge line
# 	* Loop:
# 		* append newline + line to hold space
# 		* go to next line
# 		* if line starts with doc comment, strip comment character off and loop
# 	* remove target prerequisites
# 	* append hold space (+ newline) to line
# 	* replace newline plus comments by `---`
# 	* print line
# Separate expressions are necessary because labels cannot be delimited by
# semicolon; see <http://stackoverflow.com/a/11799865/1968>
.PHONY: help
help:
	@echo "$$(tput bold)Available rules:$$(tput sgr0)"
	@echo
	@sed -n -e "/^## / { \
		h; \
		s/.*//; \
		:doc" \
		-e "H; \
		n; \
		s/^## //; \
		t doc" \
		-e "s/:.*//; \
		G; \
		s/\\n## /---/; \
		s/\\n/ /g; \
		p; \
	}" ${MAKEFILE_LIST} \
	| LC_ALL='C' sort --ignore-case \
	| awk -F '---' \
		-v ncol=$$(tput cols) \
		-v indent=19 \
		-v col_on="$$(tput setaf 6)" \
		-v col_off="$$(tput sgr0)" \
	'{ \
		printf "%s%*s%s ", col_on, -indent, $$1, col_off; \
		n = split($$2, words, " "); \
		line_length = ncol - indent; \
		for (i = 1; i <= n; i++) { \
			line_length -= length(words[i]) + 1; \
			if (line_length <= 0) { \
				line_length = ncol - indent - length(words[i]) - 1; \
				printf "\n%*s ", -indent, " "; \
			} \
			printf "%s ", words[i]; \
		} \
		printf "\n"; \
	}' \
	| more $(shell test $(shell uname) = Darwin && echo '--no-init --raw-control-chars')
