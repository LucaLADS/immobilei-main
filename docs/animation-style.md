# Ultra Premium Text Reveal (Reference)

Questo progetto usa uno stile di animazione testuale unico, da applicare fedelmente alle nuove pagine.

## Valori CSS (obbligatori)

- stato iniziale: `opacity: 0`
- stato iniziale: `transform: translateY(11vh) scale(0.996)`
- stato iniziale: `filter: blur(1px)`
- transizione: `all 1.12s cubic-bezier(.215, .61, .355, 1)`
- stato finale (`.in-page`): `opacity: 1`, `translateY(0vh)`, `scale(1)`, `blur(0)`

## Trigger viewport (obbligatorio)

- `threshold: 0.16`
- `rootMargin: "0px 0px -4% 0px"`
- micro-stagger: `28ms` con modulo `6` (`0..140ms`)

## Implementazione standard

Usare l'hook condiviso:

- `useUltraPremiumTextReveal()` in `lib/text-reveal.ts`

Questo hook è la fonte unica per applicare l'effetto in modo coerente.
