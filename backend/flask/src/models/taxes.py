from dataclasses import dataclass, field
from typing import List
from .tax import Tax


@dataclass
class Taxes:
    taxes: List[Tax] = field(default_factory=list)

    def to_list(self):
        ret = []
        for tax in self.taxes:
            ret.append(tax.to_dict())
        return ret
