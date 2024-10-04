// concept Recommending[Element]

// purpose 
// show users the most preferable elements first

// principle 
// if recommendations are enabled, user u sees a reccomended susbet r of elements e, where r is modified by computing the similarity of e to target t, an element in e.

// state
// elements: set Element
// vector: Element -> list Integer
// reccomended: list Element
// target: one Element
// proximity: list Integer

// actions
// pushup(t: Element, recommend: list Element)
//     let similarElements = { e ∈ elements | e.vector ∈ proximity of t.vector }
//     recommended := similarElements ∪ recommended

// pushdown(t: Element, recommend: list Element)
//     let similarElements = { e ∈ elements | e.vector ∈ proximity of t.vector }
//     recommended := similarElements - recommended
//     recommended := similarElements - t

// reset()