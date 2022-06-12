from dataclasses import dataclass


@dataclass
class Tax:
    tax_rate: int
    tax_id: int = -1

    def to_dict(self):
        ret = {
            "tax_id": self.tax_id,
            "tax_rate": self.tax_rate
        }
        return ret
