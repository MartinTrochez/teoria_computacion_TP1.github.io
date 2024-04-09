# Trabajo Practico I - Automatas

## Cátedra:
**Teoría de la Computación**

## Docentes:
- Ing. Lapertosa, Sergio
- Lic. Del Rosario, Gabril D.

## Alumnos:
- [Duarte, Octavio](https://github.com/octiduarte)
- [Trochez, Martín](https://github.com/MartinTrochez)

## Carrera:
Ingeniería en Sistemas de Información - Comision "A"

---

## Tipos de Automatas

## Automata Finito Determinante
Un automata finito determinante, o AFD, se define la siguiente manera:
> Una AFD es una quintupla $(Q, \Sigma, \sigma, q_0, F)$, en donde:
> - $Q$ es un conjunto finite de estados,
> - $\Sigma$ es un alfabeto finito,
> - $\sigma : Q \times \Sigma \rightarrow Q$ es la función de transición,
> - $q_0$ es el estado inicial,
> - $F \subseteq Q$ es es conjunto de estados de aceptación.

## Automata Finito No Determinante
Un automata finito no determinante o AFND, de la siguiente manera:
> Una AFND es una quintupla $(Q, \Sigma, \sigma, q_0, F)$, en donde:
> - $Q$ es un conjunto finite de estados,
> - $\Sigma$ es un alfabeto finito,
> - $\sigma : Q \times \Sigma \rightarrow P(Q)$ es la función de transición en la cual $P(Q)$ representa un una colección de todos los subconjuntos de $Q$,
> - $q_0$ es el estado inicial,
> - $F \subseteq Q$ es es conjunto de estados de aceptación.

## Automata Finito No Determinante Generalizado
Un automata finito no determinante generalizado, o AFNDG, de la siguiente manera:
> Una AFNDG es una quintupla $(Q, \Sigma, \sigma, q_{inicial}, q_{aceptacion})$, en donde:
> - $Q$ es un conjunto finite de estados,
> - $\Sigma$ es un alfabeto finito,
> - $\sigma : (Q - q_{inicial}) \times (Q - q_{aceptacion}) \rightarrow R$ es la función de transición en la cual $R$ es la colección de todas las expresiones regulares del alfabeto $\Sigma$,
> - $q_{inicial}$ es el estado inicial,
> - $q_{aceptacion}$ es el estado de aceptación.
