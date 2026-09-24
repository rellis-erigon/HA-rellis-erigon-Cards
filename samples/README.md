# Samples

`dashboard.yaml` is the reference dashboard: every faceplate in the
catalogue, one card per faceplate, captioned with the `faceplate:` id.

Entity ids are documentation examples. Two ways to use it:

**Copy a fragment.** Take the card you want and point it at your own
entities.

**Import the lot.** Create a dashboard, switch it to raw YAML, paste, then
fix the entity ids.

You can usually drop the `entities:` block altogether — roles are matched
from entity ids where the naming is recognisable, and on a typed Niagara
device they resolve on their own.
