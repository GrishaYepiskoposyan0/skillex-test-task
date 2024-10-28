export const generateCombinations = (items, length) => {
  const results = [];
  const backtrack = (start, currentCombination) => {
    if (currentCombination.length === length) {
      results.push([...currentCombination]);
      return;
    }

    for (let i = start; i < items.length; i++) {
      const item = items[i];
      const prefix = item.charAt(0);
      if (!currentCombination.some((item) => item.charAt(0) === prefix)) {
        currentCombination.push(item);
        backtrack(i + 1, currentCombination);
        currentCombination.pop();
      }
    }
  };

  backtrack(0, []);
  return results;
};
