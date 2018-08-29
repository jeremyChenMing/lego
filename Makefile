pwd:=$(shell pwd)

#image namespace, default to upvi-dev
IMG_NS?=MUST_SPECIFIED

#image label, default to latest
IMG_TAG?=""

ifneq ($(IMG_TAG), "")
IMG_TAG ="-$(IMG_TAG)"
endif

image="ccr.ccs.tencentyun.com/$(IMG_NS)/brickfun:ui$(IMG_TAG)"
base="ccr.ccs.tencentyun.com/$(IMG_NS)/brickfun:node"

all: image push

env: build-env push-env

build-env:
	@echo building $(base) ...
	@docker build -t $(base) -f env.Dockerfile .

push-env:
	@echo pushing $(base) ...
	@docker push $(base)

image:
	@echo building $(image) ...
	@docker build -t $(image) --build-arg BASE=$(base) .

push:
	@echo pushing $(image) ...
	@docker push $(image)
