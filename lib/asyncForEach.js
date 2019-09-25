/*
MODULE NAME: asyncForEach.js
PURPOSE: Provide an asynchronous forEach function.
DEPENDENCIES: No dependencies.
EXPORTS:
    (a) asyncForEach()
        (a1) See example below.

  const start = async () => {
  await asyncForEach([1, 2, 3], async (num) => {
    await waitFor(50) // Example forcing a setTimeout()
    console.log("### BEFORE ###");
    await foo();
    console.log("### AFTER ###");
    console.log(num)
  })
  console.log('Done')
}

start()

NOTES:
    (a) Credit to Sebastien Chopin
*/

async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

module.exports = asyncForEach
