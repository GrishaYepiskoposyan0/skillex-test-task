export const generateCombinations = (items, length) => {
  const uppercaseStartingCharCode = 65;
  const combinations = items.reduce((acc, cur, index) => {
    for (let i = 1; i <= cur; i++) {
      acc.push(String.fromCharCode(uppercaseStartingCharCode + index) + i);
    }
    return acc;
  }, []);

  const results = [];

  const backtrack = (start, currentCombination, prefixSet) => {
    if (currentCombination.length === length) {
      results.push([...currentCombination]);
      return;
    }

    if (currentCombination.length + (combinations.length - start) < length) {
      return;
    }

    for (let i = start; i < combinations.length; i++) {
      const item = combinations[i];
      const prefix = item.charAt(0);

      if (prefixSet.has(prefix)) {
        continue;
      }

      currentCombination.push(item);
      prefixSet.add(prefix);

      backtrack(i + 1, currentCombination, prefixSet);

      currentCombination.pop();
      prefixSet.delete(prefix);
    }
  };

  backtrack(0, [], new Set());

  return results;
};
