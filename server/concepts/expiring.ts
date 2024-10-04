// concept Expiring[Resource]

// purpose
// handle expiration of short-lives resources

// operational principle
// if you allocate a resource r for t seconds, after t seconds, the resource expires

// state
// active: set Resource
// expiry: Resource -> one Date

// actions
// allocate(r: Resource, t: Date)
// if r ∉ active then
//         active := active ∪ {r}
// r.expiry = t

// expire(r: Resource)
// if r.expiry is before now then
//     active := active - {r}  
//     r.expiry := none