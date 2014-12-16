#!/bin/sh

for pipe in `gasket ls`; do
  dat cat "$@" | gasket run $pipe > data/$pipe.ldjson
done
