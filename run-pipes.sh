#!/bin/sh

for pipe in `gasket ls`; do
  dat cat "$@" | gasket $pipe > data/$pipe.ldjson
done
