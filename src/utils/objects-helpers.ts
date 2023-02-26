 export const updateObjectInArray = (items: any, itemId: any, objPropName:  any, newObjProps: any) => {
    return items.map((u: any) => u[objPropName] === itemId ? {...u, ...newObjProps} : u)
 }