// Syncing[Data]

// purpose 
// ensure data across multiple sources remains consistent and up-to-date

// principle 
// if data d in source s is modified, then the change is propagated to targets t

// state
// datasets: set Dataset
// isSource: Dataset -> Boolean
// data: Dataset -> set Data

// actions

// pull(datasets: set Dataset)
//     let sources = { ds ∈ datasets | ds.isSource = true }
//     let targets = { ds ∈ datasets | ds.isSource = false }
    
//     for each source s ∈ sources do
//         for each d ∈ s.data do
//             if d ∉ t.data for each target t ∈ targets then
//                 t.data := t.data ∪ {d}

// push(datasets: set Dataset)
//     let sources = { ds ∈ datasets | ds.isSource = true }
//     let targets = { ds ∈ datasets | ds.isSource = false }
    
//     for each target t ∈ targets do
//         for each d ∈ t.data do
//             if d ∉ s.data for each source s ∈ sources then
//                 s.data := s.data ∪ {d}

// addSource(datasets: set Dataset, s: Dataset)
//     s.isSource := True
//     datasets := datasets ∪ {s}

// addTarget(datasets: set Dataset, t: Dataset)
//     t.isSource := False
//     datasets := datasets ∪ {t}