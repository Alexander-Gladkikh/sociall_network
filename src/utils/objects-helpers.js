 export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
    return items.map(u => u[objPropName] === itemId ? {...u, ...newObjProps} : u)
 }