const googleDatabase = [
  "cats.com",
  "souprecipes.com",
  "flowers.com",
  "animals.com",
  "catpictures.com",
  "myfavouritecats.com",
  "myfavouritecats2.com"
];

const googleSearch = (searchInput) => {
  const matches = googleDatabase.filter((website) => {
    return website.includes(searchInput);
  });
  return matches.length > 3 ? matches.slice(0, 3) : matches; // if there are more than 3 matches, just return the first 3
};

console.log(googleSearch("cat"));

module.exports = googleSearch;
