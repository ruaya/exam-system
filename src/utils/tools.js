export const uniq = function(list, predicate) {
  let hash = {}
  return list.reduce((preVal, curVal) => {
    hash[curVal[predicate]] ? '' : hash[curVal[predicate]] = true && preVal.push(curVal)
	return preVal 
  }, [])
}