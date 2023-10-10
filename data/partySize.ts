export const MAX_PARTY_SIZE = 10 as const;

type TPartySize = {
  value: number;
  label: string;
};

export const partySizes: TPartySize[] = Array.from({ length: MAX_PARTY_SIZE }, (_, i) => i + 1).map(
  (i) => ({
    value: i,
    label: `${i} ${i === 1 ? "person" : "people"}`,
  })
);
