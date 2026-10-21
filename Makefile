intl_imports = ./node_modules/.bin/intl-imports.js
transifex_utils = ./node_modules/.bin/transifex-utils.js
i18n = ./src/i18n
transifex_input = $(i18n)/transifex_input.json

# This directory must match .babelrc .
transifex_temp = ./temp/babel-plugin-formatjs

precommit:
	npm run lint
	npm audit

requirements:
	npm ci

i18n.extract:
	# Pulling display strings from .jsx files into .json files...
	rm -rf $(transifex_temp)
	npm run-script i18n_extract

i18n.concat:
	# Gathering JSON messages into one file...
	$(transifex_utils) $(transifex_temp) $(transifex_input)

extract_translations: | requirements i18n.extract i18n.concat

# Despite the name, we actually need this target to detect changes in the incoming translated message files as well.
detect_changed_source_translations:
	# Checking for changed translations...
	git diff --exit-code $(i18n)

pull_translations: | requirements
	npm run translations:pull -- --atlas-options="$(ATLAS_OPTIONS)"

# This target is used by Travis.
validate-no-uncommitted-package-lock-changes:
	# Checking for package-lock.json changes...
	git diff --exit-code package-lock.json

clean:
	rm -rf dist

build:
	tsc --project tsconfig.build.json
	find src -type f \( -name '*.scss' -o -path '*/assets/*' \) -exec sh -c '\
	  for f in "$$@"; do \
	    d="dist/$${f#src/}"; \
	    mkdir -p "$$(dirname "$$d")"; \
	    cp "$$f" "$$d"; \
	  done' sh {} +
	tsc-alias -p tsconfig.build.json

build-ci:
	SITE_CONFIG_PATH=site.config.ci.tsx openedx build
